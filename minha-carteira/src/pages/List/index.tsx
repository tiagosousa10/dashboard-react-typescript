import { useMemo, useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import ContentHeader from "../../components/ContentHeader";
import SelectInput from "../../components/SelectInput";
import HistoryFinanceCard from "../../components/HistoryFinanceCard";

import gains from "../../repositories/gains";
import expenses from "../../repositories/expenses";

import formatCurrency from "../../utils/formatCurrency";
import formatDate from "../../utils/formatDate";
import listOfmonths from "../../utils/months";

interface IData {
  id: string;
  description: string;
  amountFormated: string;
  frequency: string;
  dataFormated: string;
  tagColor: string;
}

const List = () => {
  const [data, setData] = useState<IData[]>([]);
  const [monthSelected, setMonthSelected] = useState<string>(
    String(new Date().getMonth() + 1)
  );
  const [yearSelected, setYearSelected] = useState<string>(
    String(new Date().getFullYear() - 1)
  );
  const [frequencyFilterSelected, setFrequencyFilterSelected] = useState([
    "recorrente",
    "eventual",
  ]);

  const { type } = useParams();

  const pageData = useMemo(() => {
    return type === "entry-balance"
      ? {
          title: "Entradas",
          lineColor: "#4e41f0",
          data: gains,
        }
      : {
          title: "Saídas",
          lineColor: "#e44c4e",
          data: expenses,
        };
  }, [type]);

  const years = useMemo(() => {
    const uniqueYears: number[] = [];
    const { data } = pageData;

    data.forEach((item) => {
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
  }, [pageData]);

  const months = useMemo(() => {
    return listOfmonths.map((month, index) => {
      return {
        value: index + 1,
        label: month,
      };
    });
  }, []);

  const handleFrequencyClick = (frequency: string) => {
    const alreadySelected = frequencyFilterSelected.findIndex(
      (item) => item === frequency
    );

    if (alreadySelected >= 0) {
      const filtered = frequencyFilterSelected.filter(
        (item) => item !== frequency
      );
      setFrequencyFilterSelected(filtered);
    } else {
      setFrequencyFilterSelected((oldSelected) => [...oldSelected, frequency]);
    }
  };

  const handleMonthSelected = (month: string) => {
    try {
      const parseMonth = month;
      setMonthSelected(parseMonth);
    } catch (e) {
      throw new Error("invalid month value.");
      console.log("error: ", e);
    }
  };

  const handleYearSelected = (year: string) => {
    try {
      const parseYear = year;
      setYearSelected(parseYear);
    } catch (e) {
      throw new Error("invalid year value");
      console.log("errorYEAR", e);
    }
  };

  useEffect(() => {
    const { data } = pageData;
    const filteredDate = data.filter((item) => {
      const date = new Date(item.date);

      if (isNaN(date.getTime())) {
        //console.warn(`Invalid date detected: ${item.date}`);
        return false;
      }

      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      //console.log('month:' ,month, 'year:', year)

      return (
        month === Number(monthSelected) &&
        year === Number(yearSelected) &&
        frequencyFilterSelected.includes(item.frequency)
      );
    });

    //console.log("Filtered Data:", filteredDate);

    const formattedData = filteredDate.map((item, index) => {
      return {
        id: String(index),
        description: item.description,
        amountFormated: formatCurrency(Number(item.amount)),
        frequency: item.frequency,
        dataFormated: formatDate(item.date),
        tagColor: item.frequency === "recorrente" ? "#4e41f0" : "#e44c4e",
      };
    });
    //console.log("Formatted Data:", formattedData);
    setData(formattedData);
  }, [pageData, monthSelected, yearSelected, frequencyFilterSelected]);

  return (
    <div className="w-full">
      <ContentHeader title={pageData.title} lineColor={pageData.lineColor}>
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

      <div className="w-full flex justify-center mb-8">
        <button
          type="button"
          className={`text-lg font-medium bg-transparent text-card-foreground mx-2 transition-opacity hover:opacity-70 ${
            frequencyFilterSelected.includes("recorrente")
              ? "opacity-100"
              : "opacity-40"
          }`}
          onClick={() => handleFrequencyClick("recorrente")}
        >
          Recorrentes
          <div className="w-14 mx-auto border-b-2 border-blue-500 mt-1"></div>
        </button>

        <button
          type="button"
          className={`text-lg font-medium bg-transparent text-card-foreground mx-2 transition-opacity hover:opacity-70 ${
            frequencyFilterSelected.includes("eventual")
              ? "opacity-100"
              : "opacity-40"
          }`}
          onClick={() => handleFrequencyClick("eventual")}
        >
          Eventuais
          <div className="w-14 mx-auto border-b-2 border-orange-500 mt-1"></div>
        </button>
      </div>

      <main className="space-y-4">
        {data.map((item) => (
          <HistoryFinanceCard
            key={item.id}
            tagColor={item.tagColor}
            title={item.description}
            subtitle={item.dataFormated}
            amount={item.amountFormated}
          />
        ))}
      </main>
    </div>
  );
};

export default List;
