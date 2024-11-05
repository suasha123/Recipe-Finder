import logo from "./assets/image copy 3.png";
import style from './Footer.module.css';
import { FaLocationDot } from "react-icons/fa6";
import { FaPhone } from "react-icons/fa6";


export const Footer = ()=>{
    return (
        <section className={style.footer}>
         <div className={style.navlinks}>
         <div className={style.img}><img src={logo} /></div>
         <p className={style.removedbg} style={{fontFamily : "Hibbo, sans-serif", fontSize: "14.4px" }}> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo. </p>
         </div>
         <div className={style.navlinks}>
        <h3 className={style.removedbg}>Comapny</h3>
         <a href="#" className={style.removedbg}>About Us</a>
         <a href="#" className={style.removedbg}>Career</a>
         <a href="#" className={style.removedbg}>Articles & news</a>
         </div>
         <div className={style.navlinks}>
          <h3 className={style.removedbg}>Help Center</h3>
          <a href="#" className={style.removedbg}>Conatct us</a>
          <a href="#"className={style.removedbg}>E-mail</a>
         </div>
         <div className={style.navlinks}>
            <h3 className={style.removedbg}>
             Head Office
            </h3>
            <p className={style.removedbg}> <FaLocationDot style={{ fill: '#ffa300',backgroundColor : "transparent" }}/>14/376 Ganeshpuram Lucknow - 2260028</p>
            <p className={style.removedbg}> <FaPhone style={{ fill: '#ffa300',backgroundColor : "transparent" }}/>9129714402</p>
         </div>

        </section>
    )
}