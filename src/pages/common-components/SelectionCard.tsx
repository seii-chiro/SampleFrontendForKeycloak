
type SelectionCardProps = {
    selectedRole: string;
    handleSelection: (role: 'patient' | 'dentist') => void;
    title: 'patient' | 'dentist';
    description: string;
    imageIcon: string;
};

const SelectionCard = ({ selectedRole, handleSelection, title, description, imageIcon }: SelectionCardProps) => {
    return (
        <button
            onClick={() => handleSelection(title)}
            className={`group flex flex-col items-center justify-center p-12 rounded-2xl transition-all duration-300 ${selectedRole === 'patient'
                ? 'bg-linear-to-br from-blue-400 to-blue-600 text-white shadow-xl scale-105'
                : 'bg-white text-slate-900 shadow-md hover:shadow-lg hover:scale-102'
                }`}
        >
            <div className={`text-6xl mb-4 transition-transform ${selectedRole === 'patient' ? 'scale-125' : 'group-hover:scale-110'}`}>
                {imageIcon}
            </div>
            <h3 className="text-2xl font-bold mb-2">{title.charAt(0).toUpperCase() + title.slice(1)}</h3>
            <p className={`text-center text-sm ${selectedRole === 'patient' ? 'text-blue-100' : 'text-slate-600'}`}>
                {description}
            </p>
        </button>
    )
}

export default SelectionCard