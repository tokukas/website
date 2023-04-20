import Link from '@/Components/Link';
import BrandLogo from '@/Components/Logo/Brand';
import ShopeeLogo from '@/Components/Logo/Shopee';
import TokopediaLogo from '@/Components/Logo/Tokopedia';
import { DEFAULT_NAV_ITEMS } from '@/Components/Navbar';
import AppConfig from '@/Config/App';
import useTranslator from '@/Utils/Hooks/useTranslator';
import EmailIcon from '@mui/icons-material/Email';
import InstagramIcon from '@mui/icons-material/Instagram';
import TelegramIcon from '@mui/icons-material/Telegram';
import TwitterIcon from '@mui/icons-material/Twitter';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import React from 'react';

export default function Footer() {
  const { name: appName, shopAddress, socialAccounts } = AppConfig;
  const { __ } = useTranslator([
    'About',
    'FAQ',
    'Visit our store at:',
  ]);

  return (
    <Box
      component="footer"
      sx={{
        display: 'grid',
        gridTemplateColumns: {
          xs: '1fr',
          lg: 'repeat(3, 1fr)',
        },
        gap: 5,
        py: 3,
        mt: 3,
        borderTop: (theme) => `1px solid ${theme.palette.divider}`,
      }}
    >
      <Box>
        <Link
          href="/"
          sx={{
            mb: 2,
            display: 'flex',
            alignItems: 'center',
            color: 'primary',
            textDecoration: 'none',
            overflow: 'hidden',
          }}
        >
          <BrandLogo
            height="1.5rem"
            width="auto"
            sx={{ mr: 1 }}
          />
          <Typography
            variant="h5"
            noWrap
            fontWeight={700}
          >
            {appName}
          </Typography>
        </Link>

        {shopAddress && (
          <Typography mb={2}>
            {shopAddress}
          </Typography>
        )}

        {/* Hidden if there are no any social accounts */}
        {Object.values(socialAccounts).some((value) => value) && (
          <Stack direction="row">
            {socialAccounts.email && (
              <IconButton
                href={`mailto:${socialAccounts.email}`}
                aria-label="Email"
              >
                <EmailIcon />
              </IconButton>
            )}
            {socialAccounts.telegramUsername && (
              <IconButton
                href={`https://t.me/${socialAccounts.telegramUsername}`}
                aria-label="Telegram"
              >
                <TelegramIcon />
              </IconButton>
            )}
            {socialAccounts.whatsAppNumber && (
              <IconButton
                href={`https://wa.me/${socialAccounts.whatsAppNumber}`}
                aria-label="WhatsApp"
              >
                <WhatsAppIcon />
              </IconButton>
            )}
            {socialAccounts.instagramUsername && (
              <IconButton
                href={`https://www.instagram.com/${socialAccounts.instagramUsername}`}
                aria-label="Instagram"
              >
                <InstagramIcon />
              </IconButton>
            )}
            {socialAccounts.twitterUsername && (
              <IconButton
                href={`https://www.twitter.com/${socialAccounts.twitterUsername}`}
                aria-label="Twitter"
              >
                <TwitterIcon />
              </IconButton>
            )}
          </Stack>
        )}
      </Box>

      <Box>
        <Typography
          variant="h5"
          mb={2}
        >
          Yang Bekas Pasti Lebih Murah!
        </Typography>

        {/* Menus */}
        <Stack spacing={1} alignItems="flex-start">
          {DEFAULT_NAV_ITEMS.map((item) => (
            <Typography
              key={item.name}
              component={Link}
              href="/"
              underline="hover"
              color="inherit"
            >
              {__(item.name)}
            </Typography>
          ))}
        </Stack>
      </Box>

      <Box>
        <Typography mb={2}>
          {__('Visit our store at:')}
        </Typography>

        <Stack
          direction="row"
          spacing={3}
          flexWrap="wrap"
        >
          <a
            href="https://www.tokopedia.com/tokukas"
            aria-label="Tokopedia"
          >
            <TokopediaLogo className="w-28" />
          </a>
          <a
            href="https://shopee.co.id/tokukas"
            aria-label="Shopee"
          >
            <ShopeeLogo className="w-20" />
          </a>
        </Stack>
      </Box>
    </Box>
  );
}
