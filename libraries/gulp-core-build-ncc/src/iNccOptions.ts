/**
 * @public
 */
export interface INccOptions {
  /**
   * https://github.com/zeit/ncc
   */
  cache?: string | boolean;

  /**
   * https://github.com/zeit/ncc
   */
  externals?: string[];

  /**
   * https://github.com/zeit/ncc
   */
  filterAssetBase?: string;

  /**
   * https://github.com/zeit/ncc
   */
  minify?: boolean;

  /**
   * https://github.com/zeit/ncc
   */
  sourceMap?: boolean;

  /**
   * https://github.com/zeit/ncc
   */
  sourceMapBasePrefix?: string;

  /**
   * https://github.com/zeit/ncc
   */
  sourceMapRegister?: boolean;

  /**
   * https://github.com/zeit/ncc
   */
  v8cache?: boolean;
}
