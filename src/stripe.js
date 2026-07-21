import { loadStripe } from '@stripe/stripe-js';

const STRIPE_PUBLIC_KEY = 'pk_test_51TvlZvHhxiHQFkGXvyUcXg7X1WOd0oXR5gQSqz93BR4wWlQL4Z07rDdNI7ijQjyiroHEAMskbfpUOSoxyuvd2Awl00o95EhLXh';

export const stripePromise = loadStripe(STRIPE_PUBLIC_KEY);

// Cria uma sessão de pagamento para um chamado
export const criarPagamento = async ({ chamadoId, valor, descricao, emailPagador }) => {
  try {
    const stripe = await stripePromise;
    
    // Em produção isso vai para um backend — por enquanto simulamos
    const session = {
      chamadoId,
      valor,
      descricao,
      emailPagador,
      status: 'pendente'
    };
    
    console.log('Pagamento iniciado:', session);
    return { success: true, session };
  } catch (err) {
    console.error('Erro no pagamento:', err);
    return { success: false, error: err.message };
  }
};

// Formata valor em centavos para o Stripe
export const valorEmCentavos = (reais) => Math.round(reais * 100);