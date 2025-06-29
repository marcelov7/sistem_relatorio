import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FileText, Search, Filter, Eye, Edit, Trash2 } from 'lucide-react';

interface Report {
  id: number;
  title: string;
  description: string;
  status: 'Pendente' | 'Aprovado' | 'Em Revisão';
  author: string;
  date: string;
  category: string;
}

const ReportList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  // Mock data - em produção, isso viria da API
  const reports: Report[] = [
    {
      id: 1,
      title: 'Relatório Mensal de Vendas',
      description: 'Análise detalhada das vendas do mês de junho',
      status: 'Aprovado',
      author: 'João Silva',
      date: '2023-07-15',
      category: 'Vendas',
    },
    {
      id: 2,
      title: 'Análise de Performance Q2',
      description: 'Revisão do desempenho do segundo trimestre',
      status: 'Pendente',
      author: 'Maria Santos',
      date: '2023-07-14',
      category: 'Gestão',
    },
    {
      id: 3,
      title: 'Relatório de Satisfação do Cliente',
      description: 'Pesquisa de satisfação com análise de feedback',
      status: 'Em Revisão',
      author: 'Pedro Oliveira',
      date: '2023-07-13',
      category: 'Customer Service',
    },
  ];

  const filteredReports = reports.filter(report => {
    const matchesSearch = report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === '' || report.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Aprovado':
        return 'bg-green-100 text-green-800';
      case 'Pendente':
        return 'bg-yellow-100 text-yellow-800';
      case 'Em Revisão':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="fade-in">
      {/* Header */}
      <div className="sm:flex sm:items-center sm:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Relatórios</h1>
          <p className="mt-2 text-sm text-gray-700">
            Gerencie todos os seus relatórios em um só lugar
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <Link
            to="/relatorios/novo"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            <FileText className="h-4 w-4 mr-2" />
            Novo Relatório
          </Link>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div>
            <label htmlFor="search" className="block text-sm font-medium text-gray-700">
              Buscar
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                id="search"
                className="focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                placeholder="Buscar relatórios..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700">
              Status
            </label>
            <select
              id="status"
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">Todos os status</option>
              <option value="Pendente">Pendente</option>
              <option value="Em Revisão">Em Revisão</option>
              <option value="Aprovado">Aprovado</option>
            </select>
          </div>
          <div className="flex items-end">
            <button
              type="button"
              className="w-full inline-flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              onClick={() => {
                setSearchTerm('');
                setStatusFilter('');
              }}
            >
              <Filter className="h-4 w-4 mr-2" />
              Limpar Filtros
            </button>
          </div>
        </div>
      </div>

      {/* Reports Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredReports.map((report) => (
          <div key={report.id} className="bg-white overflow-hidden shadow rounded-lg slide-up">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <FileText className="h-6 w-6 text-gray-400" />
                  <span
                    className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(report.status)}`}
                  >
                    {report.status}
                  </span>
                </div>
                <div className="flex space-x-2">
                  <Link
                    to={`/relatorios/${report.id}`}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <Eye className="h-4 w-4" />
                  </Link>
                  <Link
                    to={`/relatorios/${report.id}/editar`}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <Edit className="h-4 w-4" />
                  </Link>
                  <button className="text-gray-400 hover:text-red-600">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <div className="mt-4">
                <h3 className="text-lg font-medium text-gray-900">{report.title}</h3>
                <p className="mt-2 text-sm text-gray-500">{report.description}</p>
              </div>
              <div className="mt-4 flex justify-between text-sm text-gray-500">
                <span>Por {report.author}</span>
                <span>{new Date(report.date).toLocaleDateString('pt-BR')}</span>
              </div>
              <div className="mt-2">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                  {report.category}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredReports.length === 0 && (
        <div className="text-center py-12">
          <FileText className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">Nenhum relatório encontrado</h3>
          <p className="mt-1 text-sm text-gray-500">
            Tente ajustar os filtros ou criar um novo relatório.
          </p>
          <div className="mt-6">
            <Link
              to="/relatorios/novo"
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              <FileText className="h-4 w-4 mr-2" />
              Criar Relatório
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportList; 