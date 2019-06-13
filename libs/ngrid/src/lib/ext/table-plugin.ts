import { PblNgridPluginExtension, PblNgridPluginExtensionFactories } from './types';

/** @internal */
export const PLUGIN_STORE = new Map<keyof PblNgridPluginExtension, TablePluginMetadata & { target: any }>();

export interface TablePluginMetadata<P extends keyof PblNgridPluginExtension = keyof PblNgridPluginExtension> {
  id: P;
  factory?: P extends keyof PblNgridPluginExtensionFactories
    ? PblNgridPluginExtensionFactories[P]
    : never
  ;
  runOnce?: () => void;
}

export function TablePlugin(metadata: TablePluginMetadata) {
  if (metadata.runOnce) {
    metadata.runOnce();
  }
  return target => {
    PLUGIN_STORE.set(metadata.id, { ...metadata, target });
  }
}
