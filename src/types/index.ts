declare interface Fn<T = any> {
  (...args: T[]): T
}

declare type ElRef<T extends HTMLElement = HTMLDivElement> = Nullable<T>
