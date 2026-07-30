import { loadStripe } from '@stripe/stripe-js';

const STRIPE_PUBLIC_KEY = 'pk_test_51TvlZvHhxiHQFkGXvyUcXg7X1WOd0oXR5gQSqz93BR4wWlQL4Z07rDdNI7ijQjyiroHEAMskbfpUOSoxyuvd2Awl00o95EhLXh';

export const stripePromise = loadStripe(STRIPE_PUBLIC_KEY);

// Cria uma sessão real no Stripe Checkout (via backend) e retorna a URL
// para onde o usuário deve ser redirecionado para pagar.
export const criarCheckoutSession = async ({ chamadoId, transacaoId, valor, descricao, emailPagador }) => {
  try {
    const resp = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chamadoId, transacaoId, valor, descricao, emailPagador }),
    });
    const data = await resp.json();
    if (!resp.ok) throw new Error(data.error || 'Erro ao criar sessão de pagamento');
    return { success: true, url: data.url };
  } catch (err) {
    console.error('Erro no pagamento:', err);
    return { success: false, error: err.message };
  }
};

// Formata valor em centavos para o Stripe
export const valorEmCentavos = (reais) => Math.round(reais * 100);