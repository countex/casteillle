import { useEffect, useState } from 'react';
import { fetchMarketingCampaigns } from '../utils/api'; // Assume this function fetches marketing campaigns

export default function MarketingCampaign() {
    const [campaigns, setCampaigns] = useState([]);

    useEffect(() => {
        const getCampaigns = async () => {
            const campaignData = await fetchMarketingCampaigns();
            setCampaigns(campaignData);
        };
        getCampaigns();
    }, []);

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold">Marketing Campaigns</h2>
            {campaigns.length > 0 ? (
                <ul>
                    {campaigns.map(campaign => (
                        <li key={campaign.id} className="border p-2 mb-2">
                            <p>Campaign Name: {campaign.name}</p>
                            <p>Description: {campaign.description}</p>
                            <p>Target Audience: {campaign.targetAudience.join(', ')}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No campaigns available.</p>
            )}
        </div>
    );
}