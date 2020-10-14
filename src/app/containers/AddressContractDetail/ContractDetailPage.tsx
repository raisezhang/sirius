/**
 *
 * ContractDetailPage
 *
 */

import React, { memo } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { translations } from 'locales/i18n';
import { useBreakpoint } from 'styles/media';
import { Copy, Qrcode, Edit, Jump } from './HeadLineButtons';
import {
  BalanceCard,
  TokensCard,
  StorageStakingCard,
  NonceCard,
} from './AddressInfoCards';
import { ContractMetadata } from './ContractMetadata';
import { ContractTabsTablePanel } from './ContractTabsTablePanel';
import { Text } from 'app/components/Text';
import { useContract } from 'utils/api';
import {
  Main,
  Title,
  Middle,
  Bottom,
  HeadAddressLine,
  Top,
  Head,
} from './layouts';

interface RouteParams {
  address: string;
}

export const ContractDetailPage = memo(() => {
  const { t } = useTranslation();
  const notAvaiableText = t(translations.general.security.notAvailable);
  const { address } = useParams<RouteParams>();
  const bp = useBreakpoint();

  const { data: contractInfo } = useContract(address, ['website']);

  return (
    <>
      <Helmet>
        <title>{`${t(translations.contractDetail.title)} ${address}`}</title>
        <meta
          name="description"
          content={`${t(translations.contractDetail.content)} ${address}`}
        />
      </Helmet>
      <Main>
        <Head>
          <Title>{t(translations.general.contract)}</Title>
          <HeadAddressLine>
            {bp === 's' ? (
              <Text maxWidth="14.75rem">{address}</Text>
            ) : (
              <span>{address}</span>
            )}
            <Copy address={address} />
            <Qrcode address={address} />
            <Edit address={address} />
            {contractInfo?.website !== notAvaiableText && (
              <Jump url={address} />
            )}
          </HeadAddressLine>
        </Head>
        <Top>
          <BalanceCard address={address} />
          <TokensCard address={address} />
          <StorageStakingCard address={address} />
          <NonceCard address={address} />
        </Top>
        <Middle>
          <ContractMetadata address={address} />
        </Middle>
        <Bottom>
          <ContractTabsTablePanel key="table" address={address} />
        </Bottom>
      </Main>
    </>
  );
});
