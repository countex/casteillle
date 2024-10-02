import UserFeedback from '../../components/UserFeedback';

export default function ProductPage({ productId }) {
    return (
        <div>
            {/* Product details here */}
            <UserFeedback productId={productId} />
        </div>
    );
}