import gql from "graphql-tag";

import makeQuery from "@saleor/hooks/makeQuery";
import { staffMemberFragment } from "@saleor/staff/queries";

import { pageInfoFragment } from "../queries";
import {
  PermissionGroupList,
  PermissionGroupListVariables
} from "./types/PermissionGroupList";
import {
  PermissionGroupDetails,
  PermissionGroupDetailsVariables
} from "./types/PermissionGroupDetails";
export const permissionGroupFragment = gql`
  fragment PermissionGroupFragment on Group {
    id
    name
    users {
      id
      firstName
      lastName
    }
  }
`;

export const permissionFragment = gql`
  fragment PermissionFragment on PermissionDisplay {
    code
    name
  }
`;

export const permissionGroupDetailsFragment = gql`
  ${permissionGroupFragment}
  ${permissionFragment}
  ${staffMemberFragment}
  fragment PermissionGroupDetailsFragment on Group {
    ...PermissionGroupFragment
    permissions {
      ...PermissionFragment
    }
    users {
      ...StaffMemberFragment
    }
  }
`;

export const permissionGroupListQuery = gql`
  ${pageInfoFragment}
  ${permissionGroupFragment}
  query PermissionGroupList(
    $after: String
    $before: String
    $first: Int
    $last: Int
    $filter: PermissionGroupFilterInput
    $sort: PermissionGroupSortingInput
  ) {
    permissionGroups(
      after: $after
      before: $before
      first: $first
      last: $last
      filter: $filter
      sortBy: $sort
    ) {
      edges {
        node {
          ...PermissionGroupFragment
        }
      }
      pageInfo {
        ...PageInfoFragment
      }
    }
  }
`;
export const usePermissionGroupListQuery = makeQuery<
  PermissionGroupList,
  PermissionGroupListVariables
>(permissionGroupListQuery);

export const permissionGroupDetailsQuery = gql`
  ${permissionGroupDetailsFragment}
  query PermissionGroupDetails($id: ID!) {
    permissionGroup(id: $id) {
      ...PermissionGroupDetailsFragment
    }
  }
`;
export const usePermissionGroupDetailsQuery = makeQuery<
  PermissionGroupDetails,
  PermissionGroupDetailsVariables
>(permissionGroupDetailsQuery);