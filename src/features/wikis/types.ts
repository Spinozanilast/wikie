export type WikiLinkBaseComponentProps = {
  appId: string;
  otherClass?: string;
};

export type ImmediateWikiLinkComponentProps = WikiLinkBaseComponentProps & {
  url: string;
};

export type WikiLinkComponentProps = WikiLinkBaseComponentProps & {
  url: string | null;
};
