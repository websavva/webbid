export interface ServerPageComponentProps<
  Params extends Record<string, any> = Record<string, any>
> {
  params: Params;
  searchParams: { [key: string]: string | string[] | undefined };
}
