import styled from "styled-components";
import { PageHero, StripeCheckout } from "../components";

const CheckoutPage = () => {
  return (
    <main>
      <PageHero />
      <Wrapper className="page">
        <h1>Checkout here</h1>
      </Wrapper>
    </main>
  );
};
const Wrapper = styled.div``;
export default CheckoutPage;
