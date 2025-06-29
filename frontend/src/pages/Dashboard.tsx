import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, TrendingUp, Clock, CheckCircle } from 'lucide-react';

const Dashboard: React.FC = () => {
  const stats = [
    {
      name: 'Total de Relatórios',
      stat: '24',
      icon: FileText,
      change: '+12%',
      changeType: 'increase',
    },
    {
      name: 'Relatórios Pendentes',
      stat: '8',
      icon: Clock,
      change: '-5%',
      changeType: 'decrease',
    },
    {
      name: 'Relatórios Aprovados',
      stat: '16',
      icon: CheckCircle,
      change: '+8%',
      changeType: 'increase',
    },
    {
      name: 'Taxa de Crescimento',
      stat: '15%',
      icon: TrendingUp,
      change: '+3%',
      changeType: 'increase',
    },
  ];

  const recentReports = [
    {
      id: 1,
      title: 'Relatório Mensal de Vendas',
      status: 'Aprovado',
      date: '2023-07-15',
      author: 'João Silva',
    },
    {
      id: 2,
      title: 'Análise de Performance Q2',
      status: 'Pendente',
      date: '2023-07-14',
      author: 'Maria Santos',
    },
    {
      id: 3,
      title: 'Relatório de Satisfação do Cliente',
      status: 'Em Revisão',
      date: '2023-07-13',
      author: 'Pedro Oliveira',
    },
  ];

  return (
    <div className="fade-in">
      {/* Stats */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        {stats.map((item) => (
          <div
            key={item.name}
            className="relative bg-white pt-5 px-4 pb-12 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden"
          >
            <div>
              <div className="absolute bg-primary-500 rounded-md p-3">
                <item.icon className="h-6 w-6 text-white" aria-hidden="true" />
              </div>
              <p className="ml-16 text-sm font-medium text-gray-500 truncate">{item.name}</p>
              <p className="ml-16 text-2xl font-semibold text-gray-900">{item.stat}</p>
            </div>
            <div className="absolute bottom-0 inset-x-0 bg-gray-50 px-4 py-4 sm:px-6">
              <div className="text-sm">
                <span
                  className={`font-medium ${
                    item.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {item.change}
                </span>
                <span className="text-gray-500"> desde o mês passado</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Reports */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Relatórios Recentes
            </h3>
            <Link
              to="/relatorios"
              className="text-primary-600 hover:text-primary-500 text-sm font-medium"
            >
              Ver todos
            </Link>
          </div>
          <div className="flow-root">
            <ul className="-my-5 divide-y divide-gray-200">
              {recentReports.map((report) => (
                <li key={report.id} className="py-5">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <FileText className="h-8 w-8 text-gray-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {report.title}
                      </p>
                      <p className="text-sm text-gray-500">
                        Por {report.author} em {new Date(report.date).toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                    <div className="flex-shrink-0">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          report.status === 'Aprovado'
                            ? 'bg-green-100 text-green-800'
                            : report.status === 'Pendente'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}
                      >
                        {report.status}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <FileText className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Ações Rápidas
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    Gerencie seus relatórios
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-5 py-3">
            <div className="text-sm">
              <Link
                to="/relatorios/novo"
                className="font-medium text-primary-600 hover:text-primary-500"
              >
                Criar novo relatório
              </Link>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <TrendingUp className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Análises
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    Visualize métricas
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-5 py-3">
            <div className="text-sm">
              <Link
                to="/relatorios"
                className="font-medium text-primary-600 hover:text-primary-500"
              >
                Ver relatórios
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 