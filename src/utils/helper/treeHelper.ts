interface TreeHelperConfig {
  id: string
  children: string
  pid: string
}

// 默认配置
const DEFAULT_CONFIG: TreeHelperConfig = {
  id: 'id',
  children: 'children',
  pid: 'pid',
}

const getConfig = (config: Partial<TreeHelperConfig>) =>
  Object.assign({}, DEFAULT_CONFIG, config)

export function treeMap<T>(
  data: T[],
  opt: { children?: string; conversion: Fn }
): T[] {
  return data.map((item) => treeMapEach(item, opt))
}

export function treeMapEach(
  data: any,
  { children = 'children', conversion }: { children?: string; conversion: Fn }
) {
  const haveChildren =
    Array.isArray(data[children]) && data[children].length > 0
  const conversionData = conversion(data) || {}
  if (haveChildren) {
    return {
      ...conversionData,
      [children]: data[children].map((item: any) =>
        treeMapEach(item, { children, conversion })
      ),
    }
  }
  return {
    ...conversionData,
  }
}

export function findPath<T = any>(
  tree: any,
  func: Fn,
  config: Partial<TreeHelperConfig> = {}
) {
  const path: T[] = []
  const visitedSet = new Set()
  const list = [...tree]
  const { children } = getConfig(config)

  // 深度遍历
  while (list.length) {
    const node = list[0]
    if (visitedSet.has(node)) {
      path.pop()
      list.shift()
    } else {
      visitedSet.add(node)
      node[children!] && list.unshift(...node[children!])
      path.push(node)
      if (func(node)) {
        return path
      }
    }
  }
  return null
}
