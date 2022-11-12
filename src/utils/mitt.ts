export type EventType = string | symbol
export type Handler<T = any> = (event?: T) => void
export type WildcardHandler = (type: EventType, event?: any) => void
export type EventHandlerList = Array<Handler>
export type WildCardEventHandlerList = Array<WildcardHandler>
type EventHandlerMap = Map<EventType, EventHandlerList>

interface Emiter {
  all: EventHandlerMap
  on<T>(type: EventType, handler: Handler<T>): void
  on(type: '*', handler: WildcardHandler): void
  emit(type: EventType): void
  emit(type: '*', event?: any): void
  off(type: '*', handler: WildcardHandler): void
  off<T>(type: EventType, handler: Handler<T>): void
  clear(): void
}

export default function mitt(all?: EventHandlerMap) {
  all = all || new Map()

  return {
    all,
    on(type: EventType, handler: Handler) {
      const handlers = all?.get(type)
      const added = handlers && handlers.push(handler)
      if (!added) {
        all?.set(type, [handler])
      }
    },
    emit<T>(type: EventType, evt: T) {
      ;((all?.get(type) || []) as EventHandlerList).slice().map((handler) => {
        handler(evt)
      })
      ;((all?.get('*') || []) as WildCardEventHandlerList)
        .slice()
        .map((handler) => {
          handler(type, evt)
        })
    },
    off<T = any>(type: EventType, handler: Handler<T>) {
      // all?.has(type) && all.delete(type)
      const handlers = all?.get(type)
      if (handlers) {
        handlers.splice(handlers.indexOf(handler) >>> 0, 1)
      }
    },
    clear() {
      this.all.clear()
    },
  }
}
