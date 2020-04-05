import gql from "graphql-tag";

import makeMutation from "@saleor/hooks/makeMutation";
import { accountFragmentError } from "@saleor/customers/mutations";
import { TypedMutation } from "../mutations";
import { staffMemberDetailsFragment } from "./queries";
import { StaffAvatarDelete } from "./types/StaffAvatarDelete";
import {
  StaffAvatarUpdate,
  StaffAvatarUpdateVariables
} from "./types/StaffAvatarUpdate";
import {
  StaffMemberAdd,
  StaffMemberAddVariables
} from "./types/StaffMemberAdd";
import {
  StaffMemberDelete,
  StaffMemberDeleteVariables
} from "./types/StaffMemberDelete";
import {
  StaffMemberUpdate,
  StaffMemberUpdateVariables
} from "./types/StaffMemberUpdate";
import {
  ChangeStaffPassword,
  ChangeStaffPasswordVariables
} from "./types/ChangeStaffPassword";

export const staffFragmentError = gql`
  fragment StaffErrorFragment on StaffError {
    code
    field
  }
`;

const staffMemberAddMutation = gql`
  ${staffFragmentError}
  ${staffMemberDetailsFragment}
  mutation StaffMemberAdd($input: StaffCreateInput!) {
    staffCreate(input: $input) {
      errors: staffErrors {
        ...StaffErrorFragment
      }
      user {
        ...StaffMemberDetailsFragment
      }
    }
  }
`;
export const TypedStaffMemberAddMutation = TypedMutation<
  StaffMemberAdd,
  StaffMemberAddVariables
>(staffMemberAddMutation);

const staffMemberUpdateMutation = gql`
  ${staffFragmentError}
  ${staffMemberDetailsFragment}
  mutation StaffMemberUpdate($id: ID!, $input: StaffUpdateInput!) {
    staffUpdate(id: $id, input: $input) {
      errors: staffErrors {
        ...StaffErrorFragment
      }
      user {
        ...StaffMemberDetailsFragment
      }
    }
  }
`;
export const TypedStaffMemberUpdateMutation = TypedMutation<
  StaffMemberUpdate,
  StaffMemberUpdateVariables
>(staffMemberUpdateMutation);

const staffMemberDeleteMutation = gql`
  ${staffFragmentError}
  mutation StaffMemberDelete($id: ID!) {
    staffDelete(id: $id) {
      errors: staffErrors {
        ...StaffErrorFragment
      }
    }
  }
`;
export const TypedStaffMemberDeleteMutation = TypedMutation<
  StaffMemberDelete,
  StaffMemberDeleteVariables
>(staffMemberDeleteMutation);

const staffAvatarUpdateMutation = gql`
  ${accountFragmentError}
  mutation StaffAvatarUpdate($image: Upload!) {
    userAvatarUpdate(image: $image) {
      errors: accountErrors {
        ...AccountErrorFragment
      }
      user {
        id
        avatar {
          url
        }
      }
    }
  }
`;
export const TypedStaffAvatarUpdateMutation = TypedMutation<
  StaffAvatarUpdate,
  StaffAvatarUpdateVariables
>(staffAvatarUpdateMutation);

const staffAvatarDeleteMutation = gql`
  ${accountFragmentError}
  mutation StaffAvatarDelete {
    userAvatarDelete {
      errors: accountErrors {
        ...AccountErrorFragment
      }
      user {
        id
        avatar {
          url
        }
      }
    }
  }
`;
export const TypedStaffAvatarDeleteMutation = TypedMutation<
  StaffAvatarDelete,
  StaffMemberDeleteVariables
>(staffAvatarDeleteMutation);

const changeStaffPassword = gql`
  ${accountFragmentError}
  mutation ChangeStaffPassword($newPassword: String!, $oldPassword: String!) {
    passwordChange(newPassword: $newPassword, oldPassword: $oldPassword) {
      errors: accountErrors {
        ...AccountErrorFragment
      }
    }
  }
`;
export const useChangeStaffPassword = makeMutation<
  ChangeStaffPassword,
  ChangeStaffPasswordVariables
>(changeStaffPassword);
