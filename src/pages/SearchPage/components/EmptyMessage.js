import * as images from '~/assets/images';

function EmptyMessage() {
    return (
        <div className="text-center">
            <img src={images.default.noResult} alt="No Result" />
            <p>Không có kết quả nào phù hợp</p>
        </div>
    );
}

export default EmptyMessage;
