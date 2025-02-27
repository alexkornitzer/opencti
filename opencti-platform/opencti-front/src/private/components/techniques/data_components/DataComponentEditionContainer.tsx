import React, { FunctionComponent } from 'react';
import { graphql, PreloadedQuery, usePreloadedQuery } from 'react-relay';
import makeStyles from '@mui/styles/makeStyles';
import IconButton from '@mui/material/IconButton';
import { Close } from '@mui/icons-material';
import Typography from '@mui/material/Typography';
import { Theme } from '../../../../components/Theme';
import { useFormatter } from '../../../../components/i18n';
import { SubscriptionAvatars } from '../../../../components/Subscription';
import DataComponentEditionOverview from './DataComponentEditionOverview';
import { DataComponentEditionContainerQuery } from './__generated__/DataComponentEditionContainerQuery.graphql';
import Loader, { LoaderVariant } from '../../../../components/Loader';
import { useIsEnforceReference } from '../../../../utils/hooks/useEntitySettings';

const useStyles = makeStyles<Theme>((theme) => ({
  header: {
    backgroundColor: theme.palette.background.nav,
    padding: '20px 20px 20px 60px',
  },
  closeButton: {
    position: 'absolute',
    top: 12,
    left: 5,
    color: 'inherit',
  },
  container: {
    padding: '10px 20px 20px 20px',
  },
  title: {
    float: 'left',
  },
}));

export const dataComponentEditionQuery = graphql`
  query DataComponentEditionContainerQuery($id: String!) {
    dataComponent(id: $id) {
      ...DataComponentEditionOverview_dataComponent
      editContext {
        name
        focusOn
      }
    }
  }
`;

interface DataComponentEditionContainerProps {
  queryRef: PreloadedQuery<DataComponentEditionContainerQuery>;
  handleClose: () => void;
}

const DataComponentEditionContainer: FunctionComponent<
DataComponentEditionContainerProps
> = ({ queryRef, handleClose }) => {
  const { t } = useFormatter();
  const classes = useStyles();

  const queryData = usePreloadedQuery(dataComponentEditionQuery, queryRef);

  if (queryData.dataComponent) {
    return (
      <div>
        <div className={classes.header}>
          <IconButton
            aria-label="Close"
            className={classes.closeButton}
            onClick={handleClose}
            size="large"
            color="primary"
          >
            <Close fontSize="small" color="primary" />
          </IconButton>
          <Typography variant="h6" classes={{ root: classes.title }}>
            {t('Update a data component')}
          </Typography>
          <SubscriptionAvatars context={queryData.dataComponent.editContext} />
          <div className="clearfix" />
        </div>
        <div className={classes.container}>
          <DataComponentEditionOverview
            data={queryData.dataComponent}
            enableReferences={useIsEnforceReference('Data-Component')}
            context={queryData.dataComponent.editContext}
            handleClose={handleClose}
          />
        </div>
      </div>
    );
  }

  return <Loader variant={LoaderVariant.inElement} />;
};

export default DataComponentEditionContainer;
