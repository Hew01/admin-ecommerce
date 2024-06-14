import { Helmet } from 'react-helmet-async';
import PageHeader from './PageHeader';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Grid, Container } from '@mui/material';
import Footer from 'src/components/Footer';
import EditProduct from './EditProduct';
import { useParams } from 'react-router';

function ApplicationsTransactions() {
  const {productId} = useParams();
  return (
    <>
      <Helmet>
        <title>Edit Products</title>
      </Helmet>
      <PageTitleWrapper>
        <PageHeader productId={productId}/>
      </PageTitleWrapper>
      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12}>
            <EditProduct productId={productId}/>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default ApplicationsTransactions;
