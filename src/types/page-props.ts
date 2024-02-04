export type PageSearchParams<ParamNames extends string> = Record<
  ParamNames,
  string | string[] | undefined
>;

export type PagePropsWithSearchParams<ParamNames extends string> = {
  searchParams: PageSearchParams<ParamNames>;
};

export type PagePropsWithParams<
  Params extends Record<string, string | string[]>
> = {
  params: Params;
};
