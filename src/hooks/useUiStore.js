// Custom Hook para manejar el UI

import { useSelector, useDispatch } from 'react-redux'
import { onOpenDateModal, onCloseDateModal } from '../store'


export const useUiStore = () => {
    
    const dispatch = useDispatch()

    const { isDateModalOpen } = useSelector(state => state.ui)


    const opeDateModal = () => {
        dispatch(onOpenDateModal())
    }

    const closeDateModal = () => {
        dispatch(onCloseDateModal())
    }

    return {
        // Propiedades
        isDateModalOpen,

        //Metodos
        opeDateModal,
        closeDateModal
    }
}