import Stripe from 'stripe';
import { NextRequest, NextResponse } from 'next/server';

// Initialize Stripe with secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_build_placeholder', {
    apiVersion: '2025-12-15.clover' as any, // Explicit cast to avoid type issues if types are outdated
});

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const {
            email,
            studioName,
            billingPeriod,
            includeGiaPro,
            studioData
        } = body;

        // Build line items based on selection
        const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [];

        // Dal AI Launch - always included
        if (billingPeriod === 'annual') {
            lineItems.push({
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: 'Dal AI Launch - Annual',
                        description: 'Your branded wellness studio app',
                    },
                    unit_amount: 49000, // $490
                    recurring: { interval: 'year' },
                },
                quantity: 1,
            });
        } else {
            lineItems.push({
                price: process.env.STRIPE_PRICE_DAL_AI_LAUNCH || 'price_1SlO1406I3eFkRUmn06MwZ7e',
                quantity: 1,
            });
        }

        // GIA Pro add-on if selected
        if (includeGiaPro) {
            if (billingPeriod === 'annual') {
                lineItems.push({
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: 'GIA Pro - Annual',
                            description: 'AI-powered business automation',
                        },
                        unit_amount: 19000, // $190
                        recurring: { interval: 'year' },
                    },
                    quantity: 1,
                });
            } else {
                lineItems.push({
                    price: process.env.STRIPE_PRICE_GIA_PRO || 'price_1SlO1U06I3eFkRUm0B2LOnIk',
                    quantity: 1,
                });
            }
        }

        // Create checkout session
        const session = await stripe.checkout.sessions.create({
            mode: 'subscription',
            payment_method_types: ['card'],
            line_items: lineItems,
            customer_email: email,
            subscription_data: {
                metadata: {
                    studioName,
                    studioData: JSON.stringify(studioData),
                },
            },
            success_url: `${process.env.NEXT_PUBLIC_APP_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout`,
            metadata: {
                studioName,
            },
        });

        return NextResponse.json({
            sessionId: session.id,
            url: session.url
        });
    } catch (error) {
        console.error('Stripe checkout error:', error);
        return NextResponse.json(
            { error: 'Failed to create checkout session' },
            { status: 500 }
        );
    }
}
