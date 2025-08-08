import styles from './footer.module.css'

const Footer = ({ titulo }) => {
    return (
        <>
            <header className={styles.header}>
                <p className={styles.title}>{titulo}</p>
            </header>
        </>
    )
}

export default Footer