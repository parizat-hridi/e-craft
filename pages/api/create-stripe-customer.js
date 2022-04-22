import initStripe from 'stripe';
import { supabase } from '../../utils/supabase';

const handler = async (req, res) => {
  if (req.query.API_ROUTE_SECRET !== process.env.API_ROUTE_SECRET) {
    return res.status(401).send('you are not authorized to call this API');
  }
  const stripe = initStripe(process.env.STRIPE_SECRET_KEY);

  const customer = await stripe.customers.create({
    email: req.body.record.email,
  });

  let { error } = await supabase
    .from('profile')
    .update({
      stripe_customer: customer.id,
    })
    .eq('id', req.body.record.id);

  console.log(req.body);
  if (error) {
    alert(error.message);
  }
  console.log(req.body.record.id, customer.id);
  res.send({ message: `stripe customer created: ${customer.id}` });
};

export default handler;
