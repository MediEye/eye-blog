// 動的ルートのparams型を共通化
export type DynamicParams<T extends string> = {
  params: Record<T, string>;
}; 