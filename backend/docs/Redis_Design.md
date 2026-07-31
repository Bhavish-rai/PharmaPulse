# Redis Design

Redis is used to improve performance.

## Features

### Medicine Cache

Frequently requested medicine lists are cached.

```
Client

↓

Redis

↓

Cache Hit

↓

Return Data
```

### Concurrency

During order placement Redis prevents multiple users from purchasing the same stock simultaneously.

### Queue

Low stock alerts are placed into a Redis queue for processing.