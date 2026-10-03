import style from './Modal.module.css'


function Modal({modal, closeModal, userName}) {



        function hendelModal (e) {
            if(e.target === e.currentTarget) {
                closeModal()
            }
         }

         function keyModal () {
            window.addEventListener('keydown', e => {
                if(e.code === 'Escape'){
                    closeModal()
                }
            })
         }

         if(modal) {
            keyModal()
         }



        function hendelForm (e) {
            e.preventDefault()
            userName(e.currentTarget.elements[0].value)
            closeModal()
        }

    return (
        <div className={`${style.backdrop} ${modal ? style.hendel__open : style.hendel__close}`} onClick={ hendelModal}>
            <div className={style.modal}>
                <h2 className={style.title}>Sign up</h2>
                <form className={style.from} onSubmit={hendelForm}>
                    <label className={style.text}>Username</label>
                    <input type="text" name='username' placeholder='Username' minLength={2}/>
                    <label className={style.text}>E-Mail</label>
                    <input type="email" name="email" placeholder='E-Mail'/>
                    <label className={style.text}>Password</label>
                    <input type="password" name="password"  placeholder='Password' minLength={6}/>
                    <button className={style.btn} type="submit">Sign up</button>
                </form>
            </div>
        </div>
    )
}

export default Modal