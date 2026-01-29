import Link from 'next/link';

export function Footer() {
    return (
        <footer className="bg-gray-50 border-t border-gray-100 py-12">
            <div className="max-w-6xl mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Brand */}
                    <div>
                        <h3 className="text-xl font-bold text-primary mb-4">Tita Vigo</h3>
                        <p className="text-gray-600 text-sm">
                            Joyas elegantes al alcance de todos. Calidad y estilo para cada ocasión.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-semibold text-gray-900 mb-4">Enlaces</h4>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/productos" className="text-gray-600 hover:text-primary text-sm">
                                    Catálogo
                                </Link>
                            </li>
                            <li>
                                <Link href="/nosotros" className="text-gray-600 hover:text-primary text-sm">
                                    Nosotros
                                </Link>
                            </li>
                            <li>
                                <Link href="/contacto" className="text-gray-600 hover:text-primary text-sm">
                                    Contacto
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="font-semibold text-gray-900 mb-4">Contáctanos</h4>
                        <ul className="space-y-2 text-sm text-gray-600">
                            <li>📱 WhatsApp: +51 999 999 999</li>
                            <li>📧 hola@titavigo.pe</li>
                            <li>📍 Lima, Perú</li>
                        </ul>
                    </div>
                </div>

                <div className="mt-8 pt-8 border-t border-gray-200 text-center text-sm text-gray-500">
                    © {new Date().getFullYear()} Tita Vigo. Todos los derechos reservados.
                </div>
            </div>
        </footer>
    );
}
