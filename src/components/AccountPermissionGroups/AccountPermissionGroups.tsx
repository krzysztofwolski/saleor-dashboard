import React from "react";
import { useIntl } from "react-intl";

import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { FormChange } from "@saleor/hooks/useForm";
import { SearchPermissionGroups_search_edges_node } from "@saleor/searches/types/SearchPermissionGroups";
import { FetchMoreProps, SearchPageProps, UserError } from "@saleor/types";
import { getFieldError } from "@saleor/utils/errors";

import MultiAutocompleteSelectField, {
  MultiAutocompleteChoiceType
} from "../MultiAutocompleteSelectField";

interface AccountPermissionGroupsProps extends FetchMoreProps, SearchPageProps {
  formData: {
    permissionGroups: string[];
  };
  disabled: boolean;
  errors: UserError[];
  availablePermissionGroups: SearchPermissionGroups_search_edges_node[];
  onChange: FormChange;
  displayValues: MultiAutocompleteChoiceType[];
}

const AccountPermissionGroups: React.FC<AccountPermissionGroupsProps> = props => {
  const {
    availablePermissionGroups,
    disabled,
    displayValues,
    errors,
    formData,
    hasMore,
    loading,
    onChange,
    onFetchMore,
    onSearchChange
  } = props;

  const intl = useIntl();

  const choices = availablePermissionGroups?.map(pg => ({
    label: pg.name,
    value: pg.id
  }));

  return (
    <>
      <MultiAutocompleteSelectField
        displayValues={displayValues}
        label={intl.formatMessage({
          defaultMessage: "Permission groups"
        })}
        choices={disabled ? [] : choices}
        name="permissionGroups"
        value={formData?.permissionGroups}
        onChange={onChange}
        fetchChoices={onSearchChange}
        data-tc="permissionGroups"
        onFetchMore={onFetchMore}
        hasMore={hasMore}
        loading={loading}
      />
      {!!getFieldError(errors, "permissionGroups") && (
        <>
          <CardContent>
            <Typography color="error">
              {getFieldError(errors, "permissionGroups")?.message}
            </Typography>
          </CardContent>
        </>
      )}
    </>
  );
};

AccountPermissionGroups.displayName = "AccountPermissionGroups";
export default AccountPermissionGroups;
