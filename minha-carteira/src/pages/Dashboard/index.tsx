import React, { useCallback, useMemo, useState } from "react";

import ContentHeader from "../../components/ContentHeader";
import SelectInput from "../../components/SelectInput";
import WalletBox from "../../components/WalletBox";
import PieChartBox from "../../components/PieChartBox";
import MessageBox from "../../components/MessageBox";
import HistoryBox from "../../components/HistoryBox";
import BarChartBox from "../../components/BarChartBox";

import expenses from "../../repositories/expenses";
import gains from "../../repositories/gains";

import listOfMonths from "../../utils/months";

import happyImg from "../../assets/happy.svg";
import sadImg from "../../assets/sad.svg";
import grinningImg from "../../assets/grinning.svg";
import opsImg from "../../assets/sad.svg";

const Dashboard: React.FC = () => {
  const [monthSelected, setMonthSelected] = useState<string>(
    String(new Date().getMonth() + 1)
  );
  const [yearSelected, setYearSelected] = useState<string>(String(2024));

  const years = useMemo(() => {
    const uniqueYears: number[] = [];

    [...expenses, ...gains].forEach((item) => {
      const date = new Date(item.date);
      const year = date.getFullYear();

      if (!uniqueYears.includes(year)) {
        uniqueYears.push(year);
      }
    });

    return uniqueYears.map((year) => {
      return {
        value: year,
        label: year,
      };
    });
  }, []);

  const months = useMemo(() => {
    return listOfMonths.map((month, index) => {
      return {
        value: index + 1,
        label: month,
      };
    });
  }, []);

  const totalExpenses = useMemo(() => {
    let total: number = 0;

    expenses.forEach((item) => {
      const date = new Date(item.date);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;

      if (month === Number(monthSelected) && year === Number(yearSelected)) {
        try {
          total = total + Number(item.amount);
        } catch {
          throw new Error("invalid amount ! amount must be number.");
        }
      }
    });
    //console.log('totalEXPENSES: ',total)
    return total;
  }, [monthSelected, yearSelected]);

  const totalGains = useMemo(() => {
    let total: number = 0;

    gains.forEach((item) => {
      const date = new Date(item.date);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;

      if (month === Number(monthSelected) && year === Number(yearSelected)) {
        try {
          total = total + Number(item.amount);
        } catch {
          throw new Error("invalid amount ! amount must be number.");
        }
      }
    });
    //console.log('totalGAINS: ',total)
    return total;
  }, [monthSelected, yearSelected]);

  const totalBalance = useMemo(() => {
    return totalGains - totalExpenses;
  }, [totalExpenses, totalGains]);

  const message = useMemo(() => {
    if (totalBalance < 0) {
      return {
        title: "Que triste!",
        description: "Neste mês, gastaste mais do que deverias!",
        footerText: "Verifique os seus gastos e tente economizar!",
        icon: sadImg,
      };
    } else if (totalGains === 0 && totalExpenses === 0) {
      return {
        title: "Op's",
        description: "Neste mês não há registos de entradas ou saídas.",
        footerText: "Parece que tu não fizes-te nenhum registo.",
        icon: opsImg,
      };
    } else if (totalBalance === 0) {
      return {
        title: "Ufaaa!",
        description: "Gastas-te exatamente o que gannhas-te.",
        footerText: "Tem cuidado. No próximo mês tenta poupar!",
        icon: grinningImg,
      };
    } else {
      return {
        title: "Muito bem!",
        description: "A tua carteira está positiva!",
        footerText: "Continua assim. Considera investir o teu saldo!",
        icon: happyImg,
      };
    }
  }, [totalBalance, totalGains, totalExpenses]);

  const relationExpensesVersusGains = useMemo(() => {
    const total = totalGains + totalExpenses;

    const percentGains = (totalGains / total) * 100;
    const percentExpenses = (totalExpenses / total) * 100;

    //console.log('totalGains:', totalGains, 'totalExpenses:', totalExpenses);
    //console.log('percent-gains: ',percentGains.toFixed(1),'percent-expenses: ', percentExpenses.toFixed(1))
    const expensesPercent = Number(percentExpenses.toFixed(1));
    const gainsPercent = Number(percentGains.toFixed(1));

    const data = [
      {
        name: "Entradas",
        value: Number(totalExpenses),
        percent: expensesPercent ? expensesPercent : 0,
        color: "#10b981",
      },
      {
        name: "Saídas",
        value: Number(totalGains),
        percent: gainsPercent ? gainsPercent : 0,
        color: "#ef4444",
      },
    ];

    console.log("PieChart data:", data);
    console.log("totalGains:", totalGains, "totalExpenses:", totalExpenses);
    return data;
  }, [totalGains, totalExpenses]);

  const historyData = useMemo(() => {
    return listOfMonths
      .map((_, month) => {
        let amountEntry = 0;
        gains.forEach((gain) => {
          const date = new Date(gain.date);
          const gainMonth = date.getMonth();
          const gainYear = date.getFullYear();

          if (gainMonth === month && gainYear === Number(yearSelected)) {
            try {
              amountEntry += Number(gain.amount);
            } catch {
              throw new Error("amountEntry is invalid. must be valid number.");
            }
          }
        });

        let amountOutput = 0;
        expenses.forEach((expense) => {
          const date = new Date(expense.date);
          const expenseMonth = date.getMonth();
          const expenseYear = date.getFullYear();

          if (expenseMonth === month && expenseYear === Number(yearSelected)) {
            try {
              amountOutput += Number(expense.amount);
            } catch {
              throw new Error("amountEntry is invalid. must be valid number.");
            }
          }
        });

        return {
          monthNumber: month,
          month: listOfMonths[month].substring(0, 3),
          amountEntry,
          amountOutput,
        };
      })
      .filter((item) => {
        const currentMonth = new Date().getMonth();
        const currentYear = new Date().getFullYear();
        return (
          (Number(yearSelected) === currentYear &&
            item.monthNumber <= currentMonth) ||
          Number(yearSelected) < currentYear
        );
      });
  }, [yearSelected]);

  const relationExpensevesRecurrentVersusEventual = useMemo(() => {
    let amountRecurrent = 0;
    let amountEventual = 0;

    expenses
      .filter((expense) => {
        const date = new Date(expense.date);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;

        return month === Number(monthSelected) && year === Number(yearSelected);
      })
      .forEach((expense) => {
        if (expense.frequency === "recorrente") {
          return (amountRecurrent += Number(expense.amount));
        }

        if (expense.frequency === "eventual") {
          return (amountEventual += Number(expense.amount));
        }
      });

    const total = amountRecurrent + amountEventual;
    const recurrentPercent = Number(
      ((amountRecurrent / total) * 100).toFixed(1)
    );
    const eventualPercent = Number(((amountEventual / total) * 100).toFixed(1));

    return [
      {
        name: "Recorrentes",
        amount: amountRecurrent,
        percent: recurrentPercent ? recurrentPercent : 0,
        color: "#3b82f6",
      },
      {
        name: "Eventuais",
        amount: amountEventual,
        percent: eventualPercent ? eventualPercent : 0,
        color: "#f59e0b",
      },
    ];
  }, [monthSelected, yearSelected]);

  const relationGainsRecurrentVersusEventual = useMemo(() => {
    let amountRecurrent = 0;
    let amountEventual = 0;

    gains
      .filter((gain) => {
        const date = new Date(gain.date);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;

        return month === Number(monthSelected) && year === Number(yearSelected);
      })
      .forEach((gain) => {
        if (gain.frequency === "recorrente") {
          return (amountRecurrent += Number(gain.amount));
        }

        if (gain.frequency === "eventual") {
          return (amountEventual += Number(gain.amount));
        }
      });

    const total = amountRecurrent + amountEventual;
    const recurrentPercent = Number(
      ((amountRecurrent / total) * 100).toFixed(1)
    );
    const eventualPercent = Number(((amountEventual / total) * 100).toFixed(1));

    return [
      {
        name: "Recorrentes",
        amount: amountRecurrent,
        percent: recurrentPercent ? recurrentPercent : 0,
        color: "#10b981",
      },
      {
        name: "Eventuais",
        amount: amountEventual,
        percent: eventualPercent ? eventualPercent : 0,
        color: "#f59e0b",
      },
    ];
  }, [monthSelected, yearSelected]);

  //  useCallback -> memoriza a funcao! != useMemo -> memoriza o valor
  const handleMonthSelected = useCallback((month: string) => {
    try {
      const parseMonth = month;
      setMonthSelected(parseMonth);
    } catch {
      throw new Error("invalid month value.");
      //console.log('error: ',e)
    }
  }, []);

  const handleYearSelected = useCallback((year: string) => {
    try {
      const parseYear = year;
      setYearSelected(parseYear);
    } catch {
      throw new Error("invalid year value");
      //console.log('errorYEAR', e)
    }
  }, []);

  return (
    <div className="w-full ">
      <ContentHeader title="Dashboard" lineColor="#3b82f6">
        <div className="flex items-center gap-2">
          <label
            htmlFor="month"
            className="text-sm font-medium text-foreground whitespace-nowrap"
          >
            Mês:
          </label>
          <SelectInput
            options={months}
            onChange={(value) => handleMonthSelected(value)}
            defaultValue={monthSelected}
          />
        </div>

        <div className="flex items-center gap-2">
          <label
            htmlFor="year"
            className="text-sm font-medium text-foreground whitespace-nowrap"
          >
            Ano:
          </label>
          <SelectInput
            options={years}
            onChange={(value) => handleYearSelected(value)}
            defaultValue={yearSelected}
          />
        </div>
      </ContentHeader>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <WalletBox
          title="Saldo"
          amount={totalBalance}
          footerLabel="Atualizado com base nas entradas e saidas"
          icon="dolar"
        />

        <WalletBox
          title="Entradas"
          amount={totalGains}
          footerLabel="Atualizado com base nas entradas e saidas"
          icon="arrowUp"
        />

        <WalletBox
          title="Saídas"
          amount={totalExpenses}
          footerLabel="Atualizado com base nas entradas e saidas"
          icon="arrowDown"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <MessageBox
          title={message.title}
          description={message.description}
          footerText={message.footerText}
          icon={message.icon}
        />

        <PieChartBox data={relationExpensesVersusGains} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <HistoryBox
          data={historyData}
          lineColorAmountEntry="#10b981"
          lineColorAmountOutput="#ef4444"
        />

        <div className="space-y-6">
          <BarChartBox
            data={relationExpensevesRecurrentVersusEventual}
            title="Saídas"
          />
          <BarChartBox
            data={relationGainsRecurrentVersusEventual}
            title="Entradas"
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
