import './Top.css'
import Burger from '../../pics/burger.jpg';
import CutPart from '../../pics/cutPart.png';

const Top = () => {
    return (
        <div className="UpperContent">
            <div>
                <img className="card-img-top" src={Burger} alt="Burger" height='400' />
            </div>
            <div>
                <img className="CutPart" src={CutPart} alt="CutPart" height='400'/>
            </div>
        </div>
    )
}

export default Top