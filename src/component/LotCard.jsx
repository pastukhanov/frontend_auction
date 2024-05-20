import { Link } from "react-router-dom";

const LotCard = ({props}) => {

    const { id , name, logo, owner, status} = props;

    return (
        <Link to={`/lots/${id}`} className='border rounded-lg'>
            <div className='p-4 flex flex-col items-center'>
                <img src={`http://localhost:8080/images/${logo}`} alt="auction-logo" className="w-36 h-32 overflow-hidden" />
                <p className='text-center my-2 text-lg font-bold'>{name}</p>
                <p className='text-center text-sm'>@{owner}</p>
                <p className='text-center text-sm'>{status}</p>
            </div>
        </Link>
    )
}


export default LotCard;