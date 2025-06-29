import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Edit, Trash2, Download, Share2 } from 'lucide-react';

const ReportView: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock data - em produção, isso viria da API
  const report = {
    id: Number(id),
    title: 'Relatório Mensal de Vendas - Junho 2023',
    description: 'Análise detalhada das vendas do mês de junho com comparativo ao período anterior',
    status: 'Aprovado' as const,
    author: 'João Silva',
    date: '2023-07-15',
    category: 'Vendas',
    content: `
# Resumo Executivo

Este relatório apresenta uma análise detalhada do desempenho de vendas durante o mês de junho de 2023. Os resultados demonstram um crescimento significativo em comparação ao mesmo período do ano anterior.

## Principais Métricas

- **Receita Total**: R$ 2.450.000
- **Crescimento**: +15% em relação a maio
- **Número de Vendas**: 1.247 transações
- **Ticket Médio**: R$ 1.965

## Análise Detalhada

### Performance por Região

**Região Sudeste**
- Receita: R$ 1.225.000 (50% do total)
- Crescimento: +18%
- Principais produtos: Software empresarial, consultoria

**Região Sul**
- Receita: R$ 735.000 (30% do total)
- Crescimento: +12%
- Principais produtos: Licenças de software, suporte técnico

**Outras Regiões**
- Receita: R$ 490.000 (20% do total)
- Crescimento: +8%

### Produtos Mais Vendidos

1. **Software de Gestão Empresarial** - R$ 892.500
2. **Consultoria Especializada** - R$ 441.000
3. **Licenças Anuais** - R$ 367.500
4. **Suporte Técnico Premium** - R$ 294.000

## Conclusões e Recomendações

Os resultados de junho superaram as expectativas, com destaque para:

1. **Crescimento Sustentável**: O aumento de 15% demonstra uma tendência positiva
2. **Diversificação Regional**: Boa distribuição geográfica das vendas
3. **Mix de Produtos**: Equilíbrio entre software e serviços

### Próximos Passos

- Expandir atuação nas regiões Norte e Nordeste
- Investir em marketing digital para aumentar conversão
- Desenvolver novos produtos baseados no feedback dos clientes
- Implementar programa de fidelização para clientes enterprise

### Riscos Identificados

- Dependência da região Sudeste (50% das vendas)
- Sazonalidade típica dos meses de verão
- Concorrência crescente no segmento de software
    `,
  };

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
    <div className="fade-in max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar
        </button>
        
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-900">{report.title}</h1>
            <p className="mt-2 text-sm text-gray-600">{report.description}</p>
            
            <div className="mt-4 flex items-center space-x-4">
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(report.status)}`}
              >
                {report.status}
              </span>
              <span className="text-sm text-gray-500">
                Categoria: {report.category}
              </span>
              <span className="text-sm text-gray-500">
                Por {report.author}
              </span>
              <span className="text-sm text-gray-500">
                {new Date(report.date).toLocaleDateString('pt-BR')}
              </span>
            </div>
          </div>
          
          <div className="flex space-x-2 ml-4">
            <button className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
              <Download className="h-4 w-4 mr-2" />
              PDF
            </button>
            <button className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
              <Share2 className="h-4 w-4 mr-2" />
              Compartilhar
            </button>
            <Link
              to={`/relatorios/${report.id}/editar`}
              className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              <Edit className="h-4 w-4 mr-2" />
              Editar
            </Link>
            <button className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
              <Trash2 className="h-4 w-4 mr-2" />
              Excluir
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-8">
          <div className="prose prose-sm max-w-none">
            {report.content.split('\n').map((line, index) => {
              if (line.startsWith('# ')) {
                return (
                  <h1 key={index} className="text-2xl font-bold text-gray-900 mt-8 mb-4 first:mt-0">
                    {line.replace('# ', '')}
                  </h1>
                );
              }
              if (line.startsWith('## ')) {
                return (
                  <h2 key={index} className="text-xl font-semibold text-gray-800 mt-6 mb-3">
                    {line.replace('## ', '')}
                  </h2>
                );
              }
              if (line.startsWith('### ')) {
                return (
                  <h3 key={index} className="text-lg font-medium text-gray-700 mt-4 mb-2">
                    {line.replace('### ', '')}
                  </h3>
                );
              }
              if (line.startsWith('**') && line.endsWith('**')) {
                return (
                  <p key={index} className="font-semibold text-gray-900 mt-3 mb-2">
                    {line.replace(/\*\*/g, '')}
                  </p>
                );
              }
              if (line.startsWith('- ')) {
                return (
                  <li key={index} className="text-gray-700 ml-4 list-disc">
                    {line.replace('- ', '')}
                  </li>
                );
              }
              if (line.match(/^\d+\. /)) {
                return (
                  <li key={index} className="text-gray-700 ml-4 list-decimal">
                    {line.replace(/^\d+\. /, '')}
                  </li>
                );
              }
              if (line.trim() === '') {
                return <br key={index} />;
              }
              return (
                <p key={index} className="text-gray-700 mb-3 leading-relaxed">
                  {line}
                </p>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportView; 