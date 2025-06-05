import {type ReactNode, useMemo, useState} from 'react';
import Box from '@mui/material/Box';
import {useHref, useNavigate} from 'react-router';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Tooltip from '@mui/material/Tooltip';
import {useTranslation} from 'react-i18next';
import {visuallyHidden} from '@mui/utils';
import type {DescriptionSizes, SupportedLanguage} from '../../../types/apitypes';

import './CatalogTable.scss';

type SortOrder = 'asc' | 'desc';

export interface CatalogTableColumn {
  field: keyof CatalogTableRow;
  label: string | ReactNode;
}

export interface CatalogTableRow {
  id: number;
  latin: string;
  fi: string;
  sv?: string;
  en?: string;
  edibility?: string;
  descriptionSizes: DescriptionSizes;
}

interface CatalogTableHeadProps {
  columns: CatalogTableColumn[];
  onSortRequested: (property: keyof CatalogTableRow) => void;
  order: SortOrder;
  orderBy: string;
}

interface CatalogTableProps {
  rows: CatalogTableRow[];
  columns: CatalogTableColumn[];
}

interface ComparatorParam {
  left: CatalogTableRow;
  right: CatalogTableRow;
  orderBy: keyof CatalogTableRow;
}

const descendingComparator = ({left, right, orderBy}: ComparatorParam) => {
  const leftValue = left[orderBy] ?? '';
  const rightValue = right[orderBy] ?? '';

  if (rightValue < leftValue) {
    return -1;
  }
  if (rightValue > leftValue) {
    return 1;
  }
  return 0;
};

function getComparator(order: SortOrder, orderBy: keyof CatalogTableRow) {
  return order === 'desc'
    ? (left: CatalogTableRow, right: CatalogTableRow) => descendingComparator({left, right, orderBy})
    : (left: CatalogTableRow, right: CatalogTableRow) => -descendingComparator({left, right, orderBy});
}

const CatalogTableHead = ({columns, order, orderBy, onSortRequested}: CatalogTableHeadProps) => {
  const createSortHandler = (property: keyof CatalogTableRow) => () => {
    onSortRequested(property);
  };

  return (
    <TableHead className="catalog-table__head">
      <TableRow>
        {columns.map((column) => (
          <TableCell
            key={column.field}
            align="left"
            padding="normal"
            sortDirection={orderBy === column.field ? order : false}
          >
            <TableSortLabel
              active={orderBy === column.field}
              direction={orderBy === column.field ? order : 'asc'}
              onClick={createSortHandler(column.field)}
            >
              {column.label}
              {orderBy === column.field ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};


export const CatalogTable = ({rows, columns}: CatalogTableProps) => {
  const {t, i18n} = useTranslation();
  const href = useHref('/');
  const navigate = useNavigate();
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const [orderBy, setOrderBy] = useState<keyof CatalogTableRow>('fi');

  const hasAttributes = (row: CatalogTableRow) => {
    const currentLang = i18n.language as SupportedLanguage;

    return (row.descriptionSizes[currentLang] ?? 0) > 0;
  }

  const handleSortRequested = (property: keyof CatalogTableRow) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const sortedRows = useMemo(
    () => [...rows].sort(getComparator(order, orderBy)),
    [order, orderBy]);

  return (
    <Box className="catalog-table" sx={{width: '100%'}}>
      <Paper sx={{width: '100%', mb: 2}}>
        <TableContainer>
          <Table
            sx={{minWidth: 750}}
            aria-labelledby="tableTitle"
            size="small"
          >
            <CatalogTableHead
              columns={columns}
              order={order}
              orderBy={orderBy}
              onSortRequested={handleSortRequested}
            />
            <TableBody>
              {sortedRows.map((row) => (
                  <TableRow
                    hover
                    onClick={() => navigate(`/species/${row.id}`)}
                    onMouseUp={(event) => {
                      if (event.button === 1) {
                        event.preventDefault();
                        window.open(`${href}species/${row.id}`, '_blank');
                      }
                    }}
                    role="button"
                    key={row.id}
                    sx={{cursor: 'pointer '}}
                  >
                    <TableCell>{hasAttributes(row) &&
                      <Tooltip title={t('Lisätietoja kuvauksessa')}><span>🛈</span></Tooltip>}
                    </TableCell>
                    <TableCell>{row.fi}</TableCell>
                    <TableCell>{row.sv}</TableCell>
                    <TableCell>{row.en}</TableCell>
                    <TableCell>{row.latin}</TableCell>
                    <TableCell align="center">{row.edibility}</TableCell>
                  </TableRow>
                )
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};
