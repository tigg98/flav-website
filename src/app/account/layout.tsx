import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export default async function AccountLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect('/login?redirect=/account/billing');
    }

    return (
        <>
            <Header />
            <main className="min-h-screen bg-background">
                <div className="container-main py-8 md:py-12">
                    {children}
                </div>
            </main>
            <Footer />
        </>
    );
}
