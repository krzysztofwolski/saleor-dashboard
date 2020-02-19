import React from "react";
import { useIntl } from "react-intl";

import FormSpacer from "@saleor/components/FormSpacer";
import { maybe } from "@saleor/misc";
import { ConfirmButtonTransitionState } from "@saleor/components/ConfirmButton";
import { PermissionEnum } from "@saleor/types/globalTypes";
import { ShopInfo_shop_permissions } from "@saleor/components/Shop/types/ShopInfo";
import { UserError, ListActions } from "@saleor/types";
import AccountPermissions from "@saleor/components/AccountPermissions";
import AppHeader from "@saleor/components/AppHeader";
import PageHeader from "@saleor/components/PageHeader";
import { sectionNames } from "@saleor/intl";
import Container from "@saleor/components/Container";
import Form from "@saleor/components/Form";
import Grid from "@saleor/components/Grid";
import SaveButtonBar from "@saleor/components/SaveButtonBar";
import PermissionGroupInfo from "../PermissionGroupInfo";
import { PermissionGroupDetails_permissionGroup } from "../../types/PermissionGroupDetails";
import PermissionGroupMemberList from "../PermissionGroupMemberList";

export interface PermissionGroupDetailsPageFormData {
  name: string;
  hasFullAccess: boolean;
  isActive: boolean;
  permissions: PermissionEnum[];
}

export interface PermissionGroupDetailsPageProps extends ListActions {
  errors: UserError[];
  permissionGroup: PermissionGroupDetails_permissionGroup;
  permissions: ShopInfo_shop_permissions[];
  saveButtonBarState: ConfirmButtonTransitionState;
  disabled: boolean;

  onAssign: () => void;
  onBack: () => void;
  onUnassign: (ids: string[]) => void;
  onSubmit(data: PermissionGroupDetailsPageFormData);
}

const PermissionGroupDetailsPage: React.FC<PermissionGroupDetailsPageProps> = ({
  permissionGroup,
  permissions,
  disabled,
  onBack,
  saveButtonBarState,
  errors: userErrors,
  onSubmit,
  ...listProps
}) => {
  const intl = useIntl();

  const initialForm: PermissionGroupDetailsPageFormData = {
    hasFullAccess: false,
    isActive: false,
    name: maybe(() => permissionGroup.name) ? permissionGroup.name : "",
    permissions: maybe(() => permissionGroup.permissions, []).map(
      perm => perm.code
    )
  };

  return (
    <Form
      initial={initialForm}
      onSubmit={onSubmit}
      errors={userErrors}
      confirmLeave
    >
      {({ data, change, submit, hasChanged }) => (
        <Container>
          <AppHeader onBack={onBack}>
            {intl.formatMessage(sectionNames.permissionGroups)}
          </AppHeader>
          <PageHeader
            title={permissionGroup ? permissionGroup.name : undefined}
          />

          <Grid>
            <div>
              <PermissionGroupInfo
                data={data}
                onChange={change}
                disabled={disabled}
              />
              <FormSpacer />
              <PermissionGroupMemberList
                disabled={disabled}
                {...listProps}
                users={maybe(() => permissionGroup.users)}
              />
            </div>
            <div>
              <AccountPermissions
                data={data}
                disabled={disabled}
                permissions={permissions}
                onChange={change}
                fullAccessLabel={intl.formatMessage({
                  defaultMessage: "Group has full access to the store",
                  description: "checkbox label"
                })}
                description={intl.formatMessage({
                  defaultMessage:
                    "Expand or restrict group's permissions to access certain part of saleor system.",
                  description: "card description"
                })}
              />
            </div>
          </Grid>
          <div>
            <SaveButtonBar
              onCancel={onBack}
              onSave={submit}
              state={saveButtonBarState}
              disabled={disabled || !hasChanged}
            />
          </div>
        </Container>
      )}
    </Form>
  );
};
PermissionGroupDetailsPage.displayName = "PermissionGroupDetailsPage";
export default PermissionGroupDetailsPage;
