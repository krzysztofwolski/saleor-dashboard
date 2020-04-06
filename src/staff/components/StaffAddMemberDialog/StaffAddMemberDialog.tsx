import React, { useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import AccountPermissionGroups from "@saleor/components/AccountPermissionGroups";
import ConfirmButton, {
  ConfirmButtonTransitionState
} from "@saleor/components/ConfirmButton";
import Form from "@saleor/components/Form";
import FormSpacer from "@saleor/components/FormSpacer";
import { MultiAutocompleteChoiceType } from "@saleor/components/MultiAutocompleteSelectField";
import { AccountErrorFragment } from "@saleor/customers/types/AccountErrorFragment";
import useModalDialogErrors from "@saleor/hooks/useModalDialogErrors";
import { buttonMessages, commonMessages } from "@saleor/intl";
import { SearchPermissionGroups_search_edges_node } from "@saleor/searches/types/SearchPermissionGroups";
import { FetchMoreProps, SearchPageProps } from "@saleor/types";
import { getFormErrors } from "@saleor/utils/errors";
import getAccountErrorMessage from "@saleor/utils/errors/account";
import createMultiAutocompleteSelectHandler from "@saleor/utils/handlers/multiAutocompleteSelectChangeHandler";

export interface AddMemberFormData {
  email: string;
  firstName: string;
  lastName: string;
  permissionGroups: string[];
}

const initialForm: AddMemberFormData = {
  email: "",
  firstName: "",
  lastName: "",
  permissionGroups: []
};

const useStyles = makeStyles(
  theme => ({
    hr: {
      backgroundColor: "#eaeaea",
      border: "none",
      height: 1,
      marginBottom: 0
    },
    sectionTitle: {
      fontWeight: 600 as 600,
      marginBottom: theme.spacing(),
      marginTop: theme.spacing(2)
    },
    textFieldGrid: {
      display: "grid",
      gridColumnGap: theme.spacing(2),
      gridTemplateColumns: "1fr 1fr"
    }
  }),
  { name: "StaffAddMemberDialog" }
);

interface StaffAddMemberDialogProps extends SearchPageProps {
  availablePermissionGroups: SearchPermissionGroups_search_edges_node[];
  confirmButtonState: ConfirmButtonTransitionState;
  disabled: boolean;
  errors: AccountErrorFragment[];
  fetchMorePermissionGroups: FetchMoreProps;
  open: boolean;
  onClose: () => void;
  onConfirm: (data: AddMemberFormData) => void;
}

const StaffAddMemberDialog: React.FC<StaffAddMemberDialogProps> = props => {
  const {
    availablePermissionGroups,
    confirmButtonState,
    disabled,
    errors,
    fetchMorePermissionGroups,
    initialSearch,
    onClose,
    onConfirm,
    onSearchChange,
    open
  } = props;

  const classes = useStyles(props);
  const dialogErrors = useModalDialogErrors(errors, open);
  const intl = useIntl();

  const [
    permissionGroupsDisplayValues,
    setPermissionGroupsDisplayValues
  ] = useState<MultiAutocompleteChoiceType[]>([]);

  const formErrors = getFormErrors(
    ["firstName", "lastName", "email"],
    dialogErrors
  );

  return (
    <Dialog onClose={onClose} open={open}>
      <Form initial={initialForm} onSubmit={onConfirm}>
        {({ change, data: formData, hasChanged }) => {
          const permissionGroupsChange = createMultiAutocompleteSelectHandler(
            change,
            setPermissionGroupsDisplayValues,
            permissionGroupsDisplayValues,
            availablePermissionGroups?.map(group => ({
              label: group.name,
              value: group.id
            })) || []
          );

          return (
            <>
              <DialogTitle>
                <FormattedMessage
                  defaultMessage="Invite Staff Member"
                  description="dialog header"
                />
              </DialogTitle>
              <DialogContent>
                <div className={classes.textFieldGrid}>
                  <TextField
                    error={!!formErrors.firstName}
                    helperText={getAccountErrorMessage(
                      formErrors.firstName,
                      intl
                    )}
                    label={intl.formatMessage(commonMessages.firstName)}
                    name="firstName"
                    type="text"
                    value={formData.firstName}
                    onChange={change}
                  />
                  <TextField
                    error={!!formErrors.lastName}
                    helperText={getAccountErrorMessage(
                      formErrors.lastName,
                      intl
                    )}
                    label={intl.formatMessage(commonMessages.lastName)}
                    name="lastName"
                    type="text"
                    value={formData.lastName}
                    onChange={change}
                  />
                </div>
                <FormSpacer />
                <TextField
                  error={!!formErrors.email}
                  fullWidth
                  helperText={getAccountErrorMessage(formErrors.email, intl)}
                  label={intl.formatMessage(commonMessages.email)}
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={change}
                />
              </DialogContent>
              <hr className={classes.hr} />
              <DialogContent>
                <Typography className={classes.sectionTitle}>
                  <FormattedMessage defaultMessage="Permission Groups" />
                </Typography>
                <Typography>
                  <FormattedMessage defaultMessage="Expand or restrict user’s permissions to access certain part of saleor system." />
                </Typography>
                <AccountPermissionGroups
                  formData={formData}
                  disabled={disabled}
                  errors={[]}
                  initialSearch={initialSearch}
                  availablePermissionGroups={availablePermissionGroups}
                  onChange={permissionGroupsChange}
                  onSearchChange={onSearchChange}
                  displayValues={permissionGroupsDisplayValues}
                  {...fetchMorePermissionGroups}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={onClose}>
                  <FormattedMessage {...buttonMessages.back} />
                </Button>
                <ConfirmButton
                  color="primary"
                  disabled={!hasChanged}
                  variant="contained"
                  type="submit"
                  transitionState={confirmButtonState}
                >
                  <FormattedMessage
                    defaultMessage="Send invite"
                    description="button"
                  />
                </ConfirmButton>
              </DialogActions>
            </>
          );
        }}
      </Form>
    </Dialog>
  );
};
StaffAddMemberDialog.displayName = "StaffAddMemberDialog";
export default StaffAddMemberDialog;
