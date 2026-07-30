import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Usa a service role key (nunca a anon key) para poder gravar direto,
// ignorando RLS — essa chave só existe no ambiente do servidor.
const supabaseAdmin = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// POST /api/stripe-webhook
// Configurar no Dashboard do Stripe apontando para:
// https://cirrus-flax.vercel.app/api/stripe-webhook
export async function POST(request) {
  const rawBody = await request.text();
  const signature = request.headers.get('stripe-signature');

  let event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error('Assinatura do webhook inválida:', err.message);
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const transacaoId = session.metadata?.transacaoId;

    if (transacaoId) {
      const { error } = await supabaseAdmin
        .from('transacoes')
        .update({ status: 'pago' })
        .eq('id', transacaoId);
      if (error) console.error('Erro ao atualizar transação:', error.message);
    }
  }

  return Response.json({ received: true });
}