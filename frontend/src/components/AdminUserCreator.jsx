import { useState } from "react";
import { motion } from "framer-motion";
import { useAuthStore } from "../store/authStore";
import toast from "react-hot-toast";
import { UserPlus, Mail, Lock, User, Loader, ShieldCheck } from "lucide-react";
import Input from "./Input";

const AdminUserCreator = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const { createUserByAdmin, isLoading, user } = useAuthStore();

    const handleCreateUser = async (e) => {
        e.preventDefault();
        if (!name || !email || !password) {
            toast.error("Por favor completa todos los campos");
            return;
        }

        try {
            await createUserByAdmin(name, email, password);
            toast.success("Usuario creado silenciosamente. Suscripción de 7 días activa.");
            setName("");
            setEmail("");
            setPassword("");
        } catch (error) {
            toast.error(error.response?.data?.message || "Error al crear usuario");
        }
    };

    if (user?.role !== "admin") {
        return (
            <div className="flex flex-col items-center justify-center p-8 mt-20 bg-red-500/10 border border-red-500/20 rounded-2xl max-w-2xl mx-auto">
                <ShieldCheck className="w-16 h-16 text-red-500 mb-4" />
                <h2 className="text-2xl font-bold text-white mb-2">Acceso Denegado</h2>
                <p className="text-gray-400 text-center">
                    No tienes los permisos necesarios para realizar esta acción.
                </p>
            </div>
        );
    }

    return (
        <div className="p-6 md:p-8 max-w-4xl mx-auto space-y-8">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
                <div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">
                        Crear Nuevo Cliente
                    </h1>
                    <p className="text-gray-400 mt-2">
                        Registra un nuevo usuario directamente. Se activará su plan de 7 días al instante.
                    </p>
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-[#0f0f13]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-xl"
            >
                <div className="max-w-md mx-auto">
                    <form onSubmit={handleCreateUser} className="space-y-4">
                        <Input
                            icon={User}
                            type='text'
                            placeholder='Nombre Completo'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <Input
                            icon={Mail}
                            type='email'
                            placeholder='Correo Electrónico'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <Input
                            icon={Lock}
                            type='password'
                            placeholder='Contraseña'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <button
                            className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 focus:ring-offset-[#0f0f13] transition duration-200 mt-6"
                            type='submit'
                            disabled={isLoading}
                        >
                            {isLoading ? <Loader className=' animate-spin mx-auto' size={24} /> : (
                                <>
                                    <UserPlus className="w-5 h-5 mr-2" />
                                    Registrar Cliente
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-8 p-4 bg-orange-500/5 border border-orange-500/10 rounded-xl">
                        <p className="text-sm text-orange-400/80 text-center italic">
                            "A diferencia del registro normal, esto no cierra tu sesión de Admin ni inicia la del cliente. Puedes seguir registrando más usuarios."
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default AdminUserCreator;
