import { useState, ChangeEvent, FormEvent, Dispatch, useEffect } from 'react'
import { v4 as uuidv4} from 'uuid'
import { categories } from '../data/categories'
import { Activity } from '../types'
import { ActivityActions, ActivityState } from '../reducers/activity-reducer'

type FormProps = {
    dispatch: Dispatch<ActivityActions>
    state: ActivityState
}

const initialState : Activity = {
    id: uuidv4(),
    category: 1, // id del select
    name: '', // actividad
    calories: 0 // calorias
}

export default function Form( { dispatch, state } : FormProps ) {

    const [activity, setActivity] = useState<Activity>(initialState)

    useEffect(() => {
        if (state.activeId) {
            const selectedActivity = state.activities.filter( stateActivity => stateActivity.id === state.activeId )[0]
            setActivity(selectedActivity)
        }
    }, [state.activeId])

    const handleChange = (e: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>) => {
        setActivity({
            ...activity, // Esto lo que hace es que crea un nuevo objeto y se mantiene el estado anterior todo lo que no cambie
            [e.target.id]: e.target.value // Aquí lo que hace es que mantiene el state para que los valores no cambien, esto inmutable
        })
    }

    const isValidActivity = () => {
        const { name, calories } = activity // esto lo que hace es extraer las propiedades del objeto activity y lo convierte en una variable llamada activity
        // console.log(name.trim() !== '' && calories > 0) // Esta validación me da true o false, si el name no esta vacio y las calorias son mayores que 0
        return name.trim() !== '' && calories > 0
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        dispatch({
            type: 'save-activity',
            payload: {
                newActivity: activity
            }
        })

        setActivity({
            ...initialState,
            id: uuidv4(),
        })
    }

    return (
        <form
            className="space-y-5 bg-white shadow p-10 rounded-lg"
            onSubmit={handleSubmit}
        >
            {/* {activity.name} Con esto me doy cuenta que el state es inmutable */}
            <div className="grid grid-cols-1 gap-3">
                <label htmlFor="category" className="font-bold">Categoria:</label>
                <select
                    className="border border-slate-300 p-2 rounded-lg w-full bg-white"
                    id="category"
                    value={activity.category} // .category para seleccionar el id número 1 del select que en este caso es Comida
                    onChange={handleChange}
                >
                    {categories.map(category => (
                        <option
                            key={category.id}
                            value={category.name}
                            >
                            {category.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="grid grid-cols-1 gap-3">
                <label htmlFor="name" className="font-bold">Actividad:</label>
                <input 
                    id="name"
                    type="text"
                    className="border border-slate-300 p-2 rounded-lg"
                    placeholder="Ej. Comida, Ejercicio, etc"
                    value={activity.name}
                    onChange={handleChange}
                />
            </div>

            <div className="grid grid-cols-1 gap-3">
                <label htmlFor="calories" className="font-bold">Calorias:</label>
                <input 
                    id="calories"
                    type="number"
                    className="border border-slate-300 p-2 rounded-lg"
                    placeholder="Calorias, ej. 300 o 500"
                    value={activity.calories}
                    onChange={handleChange}
                />
            </div>  

            <input 
                type="submit"
                className="bg-gray-800 hover:bg-gray-900 w-full p-2 font-bold uppercase text-white cursor-pointer disabled:opacity-10"
                value={activity.category === 1 ? 'Guardar comida' : 'Guardar ejercicio'}
                disabled={!isValidActivity()} // Desabilito el boton si la actividad no es valida
            />
        </form>
    )
}
