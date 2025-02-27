import React, { FunctionComponent } from 'react';
import { graphql, useFragment } from 'react-relay';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { FormikConfig } from 'formik/dist/types';
import TextField from '../../../../components/TextField';
import { SubscriptionFocus } from '../../../../components/Subscription';
import CreatedByField from '../../common/form/CreatedByField';
import ObjectMarkingField from '../../common/form/ObjectMarkingField';
import MarkdownField from '../../../../components/MarkdownField';
import CommitMessage from '../../common/form/CommitMessage';
import { adaptFieldValue } from '../../../../utils/String';
import StatusField from '../../common/form/StatusField';
import {
  convertCreatedBy,
  convertMarkings,
  convertStatus,
} from '../../../../utils/edition';
import { useFormatter } from '../../../../components/i18n';
import { Option } from '../../common/form/ReferenceField';
import { CityEditionOverview_city$key } from './__generated__/CityEditionOverview_city.graphql';
import { useSchemaEditionValidation } from '../../../../utils/hooks/useEntitySettings';
import useFormEditor from '../../../../utils/hooks/useFormEditor';
import { fieldSpacingContainerStyle } from '../../../../utils/field';

const cityMutationFieldPatch = graphql`
  mutation CityEditionOverviewFieldPatchMutation(
    $id: ID!
    $input: [EditInput]!
    $commitMessage: String
    $references: [String]
  ) {
    cityEdit(id: $id) {
      fieldPatch(
        input: $input
        commitMessage: $commitMessage
        references: $references
      ) {
        ...CityEditionOverview_city
        ...City_city
      }
    }
  }
`;

export const cityEditionOverviewFocus = graphql`
  mutation CityEditionOverviewFocusMutation($id: ID!, $input: EditContext!) {
    cityEdit(id: $id) {
      contextPatch(input: $input) {
        id
      }
    }
  }
`;

const cityMutationRelationAdd = graphql`
  mutation CityEditionOverviewRelationAddMutation(
    $id: ID!
    $input: StixRefRelationshipAddInput!
  ) {
    cityEdit(id: $id) {
      relationAdd(input: $input) {
        from {
          ...CityEditionOverview_city
        }
      }
    }
  }
`;

const cityMutationRelationDelete = graphql`
  mutation CityEditionOverviewRelationDeleteMutation(
    $id: ID!
    $toId: StixRef!
    $relationship_type: String!
  ) {
    cityEdit(id: $id) {
      relationDelete(toId: $toId, relationship_type: $relationship_type) {
        ...CityEditionOverview_city
      }
    }
  }
`;

export const cityEditionOverviewFragment = graphql`
  fragment CityEditionOverview_city on City {
    id
    name
    description
    latitude
    longitude
    createdBy {
      ... on Identity {
        id
        name
        entity_type
      }
    }
    objectMarking {
      edges {
        node {
          id
          definition_type
          definition
          x_opencti_order
          x_opencti_color
        }
      }
    }
    status {
      id
      order
      template {
        name
        color
      }
    }
    workflowEnabled
  }
`;

interface CityEditionOverviewProps {
  cityRef: CityEditionOverview_city$key;
  context:
  | readonly ({
    readonly focusOn: string | null;
    readonly name: string;
  } | null)[]
  | null;
  enableReferences?: boolean;
  handleClose: () => void;
}

interface CityEditionFormValues {
  message?: string;
  references?: Option[];
  createdBy: Option | undefined;
  x_opencti_workflow_id: Option;
  objectMarking?: Option[];
}

const CityEditionOverview: FunctionComponent<CityEditionOverviewProps> = ({
  cityRef,
  context,
  enableReferences = false,
  handleClose,
}) => {
  const { t } = useFormatter();
  const city = useFragment(cityEditionOverviewFragment, cityRef);
  const basicShape = {
    name: Yup.string().min(2).required(t('This field is required')),
    description: Yup.string().nullable().max(5000, t('The value is too long')),
    latitude: Yup.number()
      .typeError(t('This field must be a number'))
      .nullable(),
    longitude: Yup.number()
      .typeError(t('This field must be a number'))
      .nullable(),
    references: Yup.array(),
    x_opencti_workflow_id: Yup.object(),
  };
  const cityValidator = useSchemaEditionValidation('City', basicShape);
  const queries = {
    fieldPatch: cityMutationFieldPatch,
    relationAdd: cityMutationRelationAdd,
    relationDelete: cityMutationRelationDelete,
    editionFocus: cityEditionOverviewFocus,
  };
  const editor = useFormEditor(city, enableReferences, queries, cityValidator);
  const onSubmit: FormikConfig<CityEditionFormValues>['onSubmit'] = (
    values,
    { setSubmitting },
  ) => {
    const { message, references, ...otherValues } = values;
    const commitMessage = message ?? '';
    const commitReferences = (references ?? []).map(({ value }) => value);
    const inputValues = Object.entries({
      ...otherValues,
      createdBy: values.createdBy?.value,
      x_opencti_workflow_id: values.x_opencti_workflow_id?.value,
      objectMarking: (values.objectMarking ?? []).map(({ value }) => value),
    }).map(([key, value]) => ({ key, value: adaptFieldValue(value) }));
    editor.fieldPatch({
      variables: {
        id: city.id,
        input: inputValues,
        commitMessage:
          commitMessage && commitMessage.length > 0 ? commitMessage : null,
        references: commitReferences,
      },
      onCompleted: () => {
        setSubmitting(false);
        handleClose();
      },
    });
  };
  const handleSubmitField = (name: string, value: Option | string) => {
    if (!enableReferences) {
      let finalValue: string = value as string;
      if (name === 'x_opencti_workflow_id') {
        finalValue = (value as Option).value;
      }
      cityValidator
        .validateAt(name, { [name]: value })
        .then(() => {
          editor.fieldPatch({
            variables: {
              id: city.id,
              input: [{ key: name, value: [finalValue ?? ''] }],
            },
          });
        })
        .catch(() => false);
    }
  };
  const initialValues = {
    name: city.name,
    description: city.description,
    latitude: city.latitude,
    longitude: city.longitude,
    references: [],
    createdBy: convertCreatedBy(city),
    objectMarking: convertMarkings(city),
    x_opencti_workflow_id: convertStatus(t, city) as Option,
  };
  return (
    <Formik
      enableReinitialize={true}
      initialValues={initialValues as never}
      validationSchema={cityValidator}
      onSubmit={onSubmit}
    >
      {({
        submitForm,
        isSubmitting,
        setFieldValue,
        values,
        isValid,
        dirty,
      }) => (
        <Form style={{ margin: '20px 0 20px 0' }}>
          <Field
            component={TextField}
            variant="standard"
            name="name"
            label={t('Name')}
            fullWidth={true}
            onFocus={editor.changeFocus}
            onSubmit={handleSubmitField}
            helperText={
              <SubscriptionFocus context={context} fieldName="name" />
            }
          />
          <Field
            component={MarkdownField}
            name="description"
            label={t('Description')}
            fullWidth={true}
            multiline={true}
            rows="4"
            style={{ marginTop: 20 }}
            onFocus={editor.changeFocus}
            onSubmit={handleSubmitField}
            helperText={
              <SubscriptionFocus context={context} fieldName="description" />
            }
          />
          <Field
            component={TextField}
            variant="standard"
            style={{ marginTop: 20 }}
            name="latitude"
            label={t('Latitude')}
            fullWidth={true}
            onFocus={editor.changeFocus}
            onSubmit={handleSubmitField}
            helperText={
              <SubscriptionFocus context={context} fieldName="latitude" />
            }
          />
          <Field
            component={TextField}
            variant="standard"
            style={{ marginTop: 20 }}
            name="longitude"
            label={t('Longitude')}
            fullWidth={true}
            onFocus={editor.changeFocus}
            onSubmit={handleSubmitField}
            helperText={
              <SubscriptionFocus context={context} fieldName="longitude" />
            }
          />
          {city?.workflowEnabled && (
            <StatusField
              name="x_opencti_workflow_id"
              type="City"
              onFocus={editor.changeFocus}
              onChange={handleSubmitField}
              setFieldValue={setFieldValue}
              style={{ marginTop: 20 }}
              helpertext={
                <SubscriptionFocus
                  context={context}
                  fieldName="x_opencti_workflow_id"
                />
              }
            />
          )}
          <CreatedByField
            name="createdBy"
            style={fieldSpacingContainerStyle}
            setFieldValue={setFieldValue}
            helpertext={
              <SubscriptionFocus context={context} fieldName="createdBy" />
            }
            onChange={editor.changeCreated}
          />
          <ObjectMarkingField
            name="objectMarking"
            style={fieldSpacingContainerStyle}
            helpertext={
              <SubscriptionFocus context={context} fieldname="objectMarking" />
            }
            onChange={editor.changeMarking}
          />
          {enableReferences && (
            <CommitMessage
              submitForm={submitForm}
              disabled={isSubmitting || !isValid || !dirty}
              setFieldValue={setFieldValue}
              open={false}
              values={values.references}
              id={city.id}
            />
          )}
        </Form>
      )}
    </Formik>
  );
};

export default CityEditionOverview;
