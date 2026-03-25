export interface ScanningFilter {
  readonly showNonFollowers: boolean;
  readonly showFollowers: boolean;
  readonly showVerified: boolean;
  readonly showPrivate: boolean;
  readonly showWithOutProfilePicture: boolean;
  readonly sortOrder: 'alphabetical' | 'chronological_desc' | 'chronological_asc';
}
