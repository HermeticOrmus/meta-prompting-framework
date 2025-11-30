# Level 6: Systems Orchestrator ⚙️

> *"Individual brilliance < Systemic excellence"*

## Overview

**Duration**: 6-8 weeks
**Time Commitment**: 20-25 hours/week
**Complexity**: ▓▓▓▓▓▓░
**Prerequisites**: Level 5 complete

### What You'll Build
- ✅ Production AI platform (99.9% uptime)
- ✅ Multi-model router with fallbacks
- ✅ Comprehensive guardrails system
- ✅ Full observability stack
- ✅ Cost-optimized serving

---

## Core Skills

| Skill | Description | Mastery Indicator |
|-------|-------------|-------------------|
| **LLMOps Mastery** | Deployment, monitoring, scaling | 1M+ requests/day |
| **Guardrails** | Safety, PII, hallucination detection | Zero critical failures |
| **Cost Optimization** | Caching, batching, routing | 50%+ cost reduction |
| **Eval-Driven Dev** | Custom evals, A/B testing | Data-driven improvements |
| **Multi-Model Orchestration** | Router, fallbacks | 99.9% uptime |
| **Observability** | Tracing, logging, alerting | Full visibility |

---

## Production Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                   PRODUCTION AI SYSTEM                       │
│                                                              │
│  ┌──────────┐    ┌─────────────┐    ┌────────────────┐     │
│  │ Gateway  │───▶│ Guardrails  │───▶│    Router      │     │
│  │Rate Limit│    │Input Validate    │Model Selection │     │
│  └──────────┘    └─────────────┘    └───────┬────────┘     │
│                                              │               │
│         ┌────────────────────────────────────┘               │
│         │                                                    │
│    ┌────┴─────┬──────────┬──────────┬──────────┐           │
│    ▼          ▼          ▼          ▼          ▼           │
│ ┌──────┐  ┌──────┐  ┌───────┐  ┌──────┐  ┌──────┐         │
│ │Claude│  │GPT-4 │  │Llama  │  │Gemini│  │Local │         │
│ │Sonnet│  │Turbo │  │3-70B  │  │Pro   │  │Model │         │
│ └──┬───┘  └──┬───┘  └───┬───┘  └──┬───┘  └──┬───┘         │
│    │         │          │          │         │              │
│    └─────────┴──────────┴──────────┴─────────┘              │
│                        ▼                                     │
│                ┌──────────────┐                              │
│                │  Guardrails  │                              │
│                │Output Filter │                              │
│                └──────┬───────┘                              │
│                       ▼                                      │
│                ┌──────────────┐    ┌──────────────┐         │
│                │    Cache     │───▶│   Response   │         │
│                │  (Semantic)  │    │              │         │
│                └──────────────┘    └──────────────┘         │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐   │
│  │              OBSERVABILITY LAYER                     │   │
│  │  [Traces] [Logs] [Metrics] [Alerts] [Evals]        │   │
│  │   (Datadog, Prometheus, Grafana, Custom)            │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

---

## Learning Path

### Week 1-2: Deployment & Serving
**Focus**: Get models into production

**Topics**:
- FastAPI for LLM serving
- Load balancing
- Auto-scaling
- Health checks
- Rate limiting

**Project**: Basic production API

### Week 3: Guardrails & Safety
**Focus**: Protect users and system

**Guardrail Types**:
```
INPUT GUARDRAILS:
├── Rate limiting (prevent abuse)
├── Input validation (reject malformed)
├── Prompt injection detection
├── PII detection (redact sensitive data)
└── Content filtering (block harmful)

OUTPUT GUARDRAILS:
├── Hallucination detection
├── PII filtering
├── Toxicity detection
├── Factuality checking
└── Citation verification
```

**Project**: Comprehensive guardrails system

### Week 4-5: Observability & Monitoring
**Focus**: Know what's happening

**Stack**:
```
METRICS (Prometheus):
- Request rate, latency, errors
- Model usage, costs
- Cache hit rates

LOGS (Structured):
- All requests/responses
- Errors with context
- Performance traces

TRACES (OpenTelemetry):
- Request flow through system
- Bottleneck identification

ALERTS (PagerDuty):
- Error rate spikes
- Latency increases
- Cost anomalies
```

**Project**: Full observability setup

### Week 6: Cost Optimization
**Focus**: Reduce spend by 50%+

**Strategies**:
```
1. SEMANTIC CACHING (30-70% reduction)
   - Cache based on semantic similarity
   - Not exact match, but "close enough"

2. MODEL ROUTING (40-60% reduction)
   - Simple tasks → cheap models
   - Complex tasks → expensive models

3. BATCHING (20-30% reduction)
   - Combine multiple requests
   - Amortize overhead

4. PROMPT COMPRESSION (20-40% reduction)
   - Remove unnecessary tokens
   - Maintain quality

5. SPECULATIVE DECODING (0% cost, 3x speed)
   - Draft with small model
   - Verify with large model
```

**Project**: Cost-optimized serving

### Week 7-8: Production Hardening
**Focus**: 99.9% uptime

**Topics**:
- Circuit breakers
- Retry with fallbacks
- Graceful degradation
- Disaster recovery
- Load testing

**Project**: Battle-tested production system

---

## Major Projects

### Project 1: Multi-Model Router
**Objective**: Intelligent routing to optimal model

**Implementation**:
```python
class ModelRouter:
    def __init__(self):
        self.models = {
            "simple": ClaudeHaikuClient(),    # $0.00025/1K
            "medium": ClaudeSonnetClient(),   # $0.003/1K
            "complex": ClaudeOpusClient(),    # $0.015/1K
            "cheap": GPT3_5Client(),          # $0.0015/1K
            "smart": GPT4Client()             # $0.03/1K
        }

    def route(self, request: Request) -> Response:
        # 1. Analyze complexity
        complexity = self.analyze_complexity(request)

        # 2. Consider latency requirements
        if request.latency_sensitive:
            model = "simple" if complexity < 0.5 else "medium"
        else:
            model = self.cost_optimize(complexity)

        # 3. Check availability
        if not self.is_healthy(model):
            model = self.get_fallback(model)

        # 4. Route and track
        response = self.models[model].call(request)
        self.track_metrics(model, request, response)

        return response
```

**Features**:
- Complexity-based routing
- Health checks with fallbacks
- A/B testing support
- Cost tracking
- Latency optimization

### Project 2: Guardrails System
**Objective**: Safety at input and output

**Architecture**:
```python
class GuardrailsSystem:
    def __init__(self):
        self.input_guards = [
            RateLimiter(),
            PromptInjectionDetector(),
            PIIDetector(),
            ContentFilter()
        ]
        self.output_guards = [
            HallucinationDetector(),
            ToxicityFilter(),
            PIIRedactor(),
            CitationVerifier()
        ]

    def check_input(self, request: str) -> GuardrailResult:
        """Run all input guardrails"""
        for guard in self.input_guards:
            result = guard.check(request)
            if result.blocked:
                return result
        return GuardrailResult(allowed=True)

    def check_output(self, response: str, context: dict) -> str:
        """Filter output through guardrails"""
        for guard in self.output_guards:
            response = guard.filter(response, context)
        return response
```

**Guardrail Examples**:
```python
class HallucinationDetector:
    """Detect factually incorrect claims"""

    def detect(self, response: str, context: dict) -> bool:
        # 1. Extract claims from response
        claims = self.extract_claims(response)

        # 2. Verify against context
        for claim in claims:
            if not self.is_supported(claim, context):
                return True  # Hallucination detected

        return False

class PIIDetector:
    """Detect personally identifiable information"""

    PATTERNS = {
        "email": r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b',
        "phone": r'\b\d{3}[-.]?\d{3}[-.]?\d{4}\b',
        "ssn": r'\b\d{3}-\d{2}-\d{4}\b',
        "credit_card": r'\b\d{4}[-\s]?\d{4}[-\s]?\d{4}[-\s]?\d{4}\b'
    }

    def detect_and_redact(self, text: str) -> str:
        for pii_type, pattern in self.PATTERNS.items():
            text = re.sub(pattern, f"[REDACTED_{pii_type.upper()}]", text)
        return text
```

### Project 3: Observability Stack
**Objective**: Full visibility into production system

**Components**:
```python
# 1. Structured Logging
import structlog

logger = structlog.get_logger()

def handle_request(request):
    logger.info(
        "llm_request",
        request_id=request.id,
        model=request.model,
        input_tokens=count_tokens(request.prompt),
        user_id=request.user_id
    )

    response = model.call(request)

    logger.info(
        "llm_response",
        request_id=request.id,
        output_tokens=count_tokens(response),
        latency_ms=response.latency,
        cost=response.cost
    )

# 2. Metrics (Prometheus)
from prometheus_client import Counter, Histogram

requests_total = Counter('llm_requests_total', 'Total requests', ['model', 'status'])
latency = Histogram('llm_latency_seconds', 'Request latency', ['model'])
cost = Counter('llm_cost_dollars', 'Total cost', ['model'])

def track_metrics(model, latency_s, cost_usd, status):
    requests_total.labels(model=model, status=status).inc()
    latency.labels(model=model).observe(latency_s)
    cost.labels(model=model).inc(cost_usd)

# 3. Distributed Tracing (OpenTelemetry)
from opentelemetry import trace

tracer = trace.get_tracer(__name__)

def process_request(request):
    with tracer.start_as_current_span("process_request") as span:
        span.set_attribute("model", request.model)

        with tracer.start_as_current_span("guardrails"):
            check_guardrails(request)

        with tracer.start_as_current_span("llm_call"):
            response = call_llm(request)

        with tracer.start_as_current_span("post_process"):
            final = post_process(response)

        return final
```

---

## Cost Optimization Deep Dive

### Semantic Caching
**Concept**: Cache by meaning, not exact match

```python
class SemanticCache:
    def __init__(self, threshold=0.95):
        self.cache = {}
        self.embeddings = {}
        self.threshold = threshold

    def get(self, query: str) -> Optional[str]:
        # 1. Get query embedding
        query_emb = embed(query)

        # 2. Find similar cached queries
        for cached_query, cached_emb in self.embeddings.items():
            similarity = cosine_similarity(query_emb, cached_emb)

            if similarity >= self.threshold:
                return self.cache[cached_query]

        return None

    def set(self, query: str, response: str):
        self.embeddings[query] = embed(query)
        self.cache[query] = response
```

**Results**:
- Hit rate: 30-70% (depends on domain)
- Cost savings: Proportional to hit rate
- Latency: <1ms cache lookup vs 2-5s LLM call

---

## Resources

### Essential Reading
1. **LLMOps Guide** (Databricks, 2024)
2. **Production LLMs** (Chip Huyen, 2024)
3. **Guardrails AI** (Documentation)
4. **OpenTelemetry** (Observability standard)

### Tools & Platforms
- **Serving**: vLLM, TGI, FastAPI
- **Monitoring**: Prometheus, Grafana, Datadog
- **Guardrails**: Guardrails AI, NeMo Guardrails
- **Caching**: Redis, Momento
- **Tracing**: OpenTelemetry, LangSmith

### Production Examples
- **LangChain in Production** (case studies)
- **Anthropic Claude Best Practices**
- **OpenAI Production Guide**

---

## Assessment

### Production Readiness Checklist
- [ ] 99.9% uptime (3 nines) (20%)
- [ ] <200ms p95 latency (15%)
- [ ] Comprehensive guardrails (20%)
- [ ] Full observability (metrics, logs, traces) (15%)
- [ ] Cost optimized (50%+ reduction) (15%)
- [ ] Load tested (10K+ req/sec) (10%)
- [ ] Documentation & runbooks (5%)

**Passing**: ≥80% + deployed and running

### Diagnostic Test
**[Level 6 Assessment →](../../assessments/diagnostics/level-6-diagnostic.md)**

**Tasks**:
- Design production architecture (30 min)
- Debug production incident (30 min)
- Optimize for cost (25 min)

---

## Common Pitfalls

### "Costs spiraling out of control"
**Fix**:
- Implement semantic caching ASAP
- Route to cheaper models
- Monitor and alert on spend

### "Downtime during deployments"
**Fix**:
- Blue-green deployments
- Health checks before routing
- Gradual rollout (canary)

### "Can't debug issues"
**Fix**:
- Structured logging with request IDs
- Distributed tracing
- Retain logs for 30+ days

---

## Next Steps

### When Ready for Level 7:
```bash
python cli.py assess-level --level=6
python cli.py start-level 7
```

### Preview of Level 7: Architect of Intelligence
- Meta-learning systems
- Categorical thinking
- Self-improving AI
- Research → Production pipeline
- Breakthrough innovations
- Project: Meta-prompting system

---

**Start Level 6** → [Week-by-Week Guide](./week-by-week.md) *(Coming Soon)*

*Level 6 v1.0 | Production systems handling 1M+ requests/day*
