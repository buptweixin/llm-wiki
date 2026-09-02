估算大模型推理显存，核心就是拆成：

[
\textbf{总显存} =
\underbrace{\text{模型权重}}*{\text{固定}}
+
\underbrace{\text{KV Cache}}*{\text{随上下文长度增长}}
+
\underbrace{\text{Activation / Runtime Buffer}}_{\text{随 batch、实现变化}}
]

对于 **Qwen3-30B-A3B-Instruct-2507** 这种 MoE 模型，不能简单按“30B 参数 × dtype”算，因为 **30B 是总参数，实际激活参数只有约 3B**。推理显存主要取决于：

1. **全部专家权重是否加载**
2. **dtype / quant**
3. **KV cache 大小**
4. **最大上下文长度**
5. **batch size / 并发数**

下面按照这个模型具体计算。配置来自 HuggingFace config.json。([Hugging Face][1])

---

# 1. 首先看 config.json 哪些参数重要

Qwen3-30B-A3B 配置关键字段：

```json
{
  "model_type": "qwen3_moe",

  "hidden_size": 2048,

  "num_hidden_layers": 48,

  "num_attention_heads": 32,
  "num_key_value_heads": 4,
  "head_dim": 128,

  "num_experts": 128,
  "num_experts_per_tok": 8,

  "moe_intermediate_size": 768,

  "vocab_size": 151936,

  "torch_dtype": "bfloat16",

  "use_cache": true
}
```

([Hugging Face][1])

重点关注：

| 参数                      | 作用                | 影响        |
| ----------------------- | ----------------- | --------- |
| hidden_size             | 隐藏维度              | 权重、KV     |
| num_hidden_layers       | 层数                | 权重、KV     |
| num_attention_heads     | Q head数量          | KV        |
| num_key_value_heads     | GQA KV head数量     | KV（非常重要）  |
| head_dim                | 每个head维度          | KV        |
| num_experts             | 专家数量              | MoE权重     |
| num_experts_per_tok     | 激活专家数             | 计算量，不决定显存 |
| moe_intermediate_size   | MoE FFN维度         | 专家参数量     |
| vocab_size              | embedding/lm_head | 少量        |
| max_position_embeddings | 最大上下文上限           | 不是实际KV显存  |
| torch_dtype             | 权重精度              | 显存倍率      |

---

# 2. 计算模型权重显存

## 2.1 Dense Transformer 权重公式

对于普通 LLM：

[
Params \approx
L(Attention + FFN)
]

但是 Qwen3-30B 是 MoE：

每层：

## Attention 参数

Qwen 使用 GQA：

[
Q = hidden \times (num_heads \times head_dim)
]

这里：

```
hidden_size=2048
num_heads=32
head_dim=128
```

所以：

[
Q=2048 \times (32\times128)
]

=

[
8.39M
]

---

K/V：

因为：

```
num_key_value_heads=4
```

所以：

[
KV=2\times2048\times(4\times128)
]

=

[
2.1M
]

Attention 总计：

约：

[
10.5M/layer
]

48层：

[
10.5M\times48
=============

504M
]

约5亿参数。

---

# 2.2 MoE FFN 参数

关键：

```
num_experts=128
moe_intermediate_size=768
```

每个 expert 是：

[
gate/up/down
]

三个矩阵：

[
3\times hidden \times intermediate
]

即：

[
3\times2048\times768
]

=

4.72M 参数/expert

128个专家：

[
4.72M\times128
]

=

604M/layer

48层：

[
604M\times48
]

=

29B

所以 MoE FFN：

约：

[
29B
]

再加 attention、embedding、router：

约：

[
30B
]

这就是名字里的 30B。

---

# 3. BF16 权重显存

BF16：

[
2 Bytes / parameter
]

所以：

[
30B \times2
]

=

[
60GB
]

但是实际：

还需要：

* tensor metadata
* CUDA kernel buffer
* allocator fragmentation
* embedding padding

通常：

[
60GB \times 1.05\sim1.15
]

约：

```
63~70GB
```

所以：

## Qwen3-30B-A3B BF16 单卡

至少：

```
80GB GPU
```

比较舒服。

例如：

* H100 80G ✅
* A100 80G ✅
* A800 80G ✅
* 48G ❌

---

# 4. 为什么叫 A3B？

因为：

```
num_experts_per_tok=8
```

每个 token 只激活：

8个expert。

激活参数：

每层：

[
4.72M\times8
]

=

37.7M

48层：

[
1.8B
]

加 attention：

约：

[
3B
]

所以：

* 总参数：30B
* 每 token 激活：3B

但是注意：

> 推理时权重仍然需要全部加载。

所以显存看 30B，不看 3B。

---

# 5. KV Cache 显存计算（推理最容易忽略）

KV cache：

公式：

[
Memory =
2
\times
Layers
\times
SeqLen
\times
KVHeads
\times
HeadDim
\times
dtype
]

为什么有两个？

因为：

* K
* V

代入 Qwen3：

```
layers=48
kv_heads=4
head_dim=128
dtype=BF16=2 bytes
```

每 token：

[
2\times48\times4\times128\times2
]

=

[
98304 bytes
]

约：

```
96 KB/token
```

---

## 8k context

[
96KB\times8192
]

=

```
768 MB
```

---

## 32k context

[
96KB\times32768
]

=

```
3 GB
```

---

## 128k context

[
96KB\times131072
]

=

```
12 GB
```

---

所以：

| 上下文  | KV Cache |
| ---- | -------: |
| 8k   |   0.75GB |
| 32k  |      3GB |
| 64k  |      6GB |
| 128k |     12GB |
| 256k |     24GB |

虽然 config：

```
max_position_embeddings=262144
```

但你不会默认开满。

---

# 6. Batch 对 KV 的影响

上面是假设：

```
batch=1
```

实际：

[
KV = batch \times seq
]

例如：

vLLM：

```
max_model_len=32768
batch=16
```

KV：

[
3GB\times16
]

=

```
48GB
```

这时候显存爆炸。

---

# 7. 推理显存实际估算

## 场景1：单请求

Qwen3-30B-A3B BF16:

| 部分      |      显存 |
| ------- | ------: |
| 权重      | 60~65GB |
| KV 8k   |   0.8GB |
| runtime |   3~5GB |
| 总计      | 65~70GB |

80G卡：

✅

---

## 场景2：32k上下文

| 部分      |   显存 |
| ------- | ---: |
| 权重      | 60GB |
| KV      |  3GB |
| runtime |  5GB |
| 总计      | 68GB |

80G：

✅

---

## 场景3：128k上下文

| 部分      |   显存 |
| ------- | ---: |
| 权重      | 60GB |
| KV      | 12GB |
| runtime |  5GB |
| 总计      | 77GB |

80G：

接近极限。

---

# 8. Tensor Parallel 怎么估算？

如果 TP=4：

权重：

[
60/4
]

=

15GB/GPU

KV：

通常复制：

每卡：

[
KV
]

所以：

128k：

```
15GB + 12GB + runtime
≈32GB/GPU
```

因此：

4×24G：

可能不行。

4×40G：

舒服。

---

# 9. vLLM 实际经验公式

部署 vLLM：

可以粗略：

```
显存需求 =
模型权重显存
+
(batch_size × max_model_len × 每token KV)
+
5~10GB
```

对于 Qwen3-30B-A3B:

### BF16:

```
weight ≈ 65GB

KV/token ≈96KB
```

所以：

```
显存 ≈65GB
+ batch × seq × 96KB
+ 5GB
```

---

# 10. 如果量化

## FP8

权重：

[
30B\times1Byte
]

≈

```
30GB
```

实际：

35GB左右。

## INT4

约：

```
15GB~20GB
```

但 KV 通常还是 BF16。

---

# 总结：看 config.json 的口诀

估算推理显存：

## 第一看

```
torch_dtype
```

决定权重：

```
params × bytes
```

## 第二看

```
num_experts
moe_intermediate_size
num_hidden_layers
```

算 MoE 总参数。

## 第三看

```
num_key_value_heads
head_dim
num_hidden_layers
```

算 KV cache。

## 第四看

```
max_model_len
batch size
```

决定实际运行显存。

对于 Qwen3-30B-A3B：

* 总参数：30B
* BF16 权重：≈60GB
* KV：≈96KB/token
* H100/A100 80G 单卡可跑
* 高并发需要 TP 或量化

这个方法可以直接迁移到 Qwen3-VL、DeepSeek-MoE、Mixtral、Kimi-K2 等 MoE 模型。

[1]: https://huggingface.co/Qwen/Qwen3-30B-A3B-Instruct-2507/blame/main/config.json?utm_source=chatgpt.com "config.json · Qwen/Qwen3-30B-A3B-Instruct-2507 at main"

