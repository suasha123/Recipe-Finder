import logo from './assets/eat.jpg';
import styles from './Aside.module.css';
export  const Surya = ()=>{
    return (
        <div className={styles.container}>
            <div className={styles.containerimg}>
             <img src={logo}/>
            </div>
            <div className={styles.containeritem}>
            <p className={styles.para}>WHO WE ARE ?</p>
            <h3>We Are The High Quality And Proffessinal Nutrition</h3>
            <p className={styles.para2}>Consectetur sollicitudin convallis metus class maecenas eros dis lobortis tincidunt. Ac pharetra dolor montes dignissim fames vehicula class facilisis commodo. Sed hac feugiat auctor urna tortor volutpat curabitur vivamus consectetuer.</p>
            <button>Learn More</button>
            </div>
        </div>
    )
}