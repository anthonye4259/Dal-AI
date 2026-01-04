import { Metadata } from 'next';
import PreviewClient from './PreviewClient';

// This would normally fetch from Firebase
async function getStudioData(studioId: string) {
    // Mock data for now - in production, fetch from Firestore
    return {
        id: studioId,
        name: 'Zen Flow Yoga',
        fullName: 'Zen Flow Yoga Studio',
        brandColor: '#4A9FD4',
        icon: '🧘',
        category: 'yoga',
        classes: [
            { name: 'Morning Vinyasa', time: '6:30 AM', instructor: 'Sarah' },
            { name: 'Power Yoga', time: '9:00 AM', instructor: 'Mike' },
            { name: 'Yin Restore', time: '7:00 PM', instructor: 'Emma' },
        ],
    };
}

export async function generateMetadata({
    params
}: {
    params: Promise<{ studioId: string }>
}): Promise<Metadata> {
    const { studioId } = await params;
    const studio = await getStudioData(studioId);

    return {
        title: `${studio.name}'s App Preview | Dal AI`,
        description: `See ${studio.name}'s custom wellness studio app. Book classes, manage memberships, and more.`,
        openGraph: {
            title: `${studio.name}'s Studio App`,
            description: `Check out ${studio.name}'s branded booking app - built with Dal AI`,
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title: `${studio.name}'s App Preview`,
            description: 'This could be YOUR studio app. Build yours in 60 seconds.',
        },
    };
}

export default async function PreviewPage({
    params
}: {
    params: Promise<{ studioId: string }>
}) {
    const { studioId } = await params;
    const studio = await getStudioData(studioId);

    return <PreviewClient studio={studio} />;
}
