import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// POST /api/create-checkout-session
// Recebe os dados do chamado/transação e devolve a URL do Stripe Checkout
export async function POST(request) {
  try {
    const { valor, descricao, emailPagador, chamadoId, transacaoId } = await request.json();

    if (!valor || valor <= 0) {
      return Response.json({ error: 'Valor inválido' }, { status: 400 });
    }

    const origin = request.headers.get('origin') || new URL(request.url).origin;

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      customer_email: emailPagador || undefined,
      line_items: [
        {
          price_data: {
            currency: 'brl',
            product_data: { name: descricao || 'Serviço Cirrus' },
            unit_amount: Math.round(valor * 100),
          },
          quantity: 1,
        },
      ],
      metadata: {
        chamadoId: chamadoId != null ? String(chamadoId) : '',
        transacaoId: transacaoId != null ? String(transacaoId) : '',
      },
      success_url: `${origin}/?pagamento=sucesso&transacao=${transacaoId || ''}&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/?pagamento=cancelado&transacao=${transacaoId || ''}`,
    });

    return Response.json({ url: session.url, sessionId: session.id });
  } catch (err) {
    console.error('Erro ao criar sessão de checkout:', err);
    return Response.json({ error: err.message }, { status: 500 });
  }
}